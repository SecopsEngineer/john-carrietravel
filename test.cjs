const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const data = JSON.parse(fs.readFileSync('content.json'));
const pages = fs.readdirSync('dist').filter(f => f.endsWith('.html'));
for (const file of pages) {
  const html = fs.readFileSync('dist/' + file, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, file + ': one primary heading');
  assert(html.includes('lang="en"'));
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|#)/.test(href)) continue;
    const target = href.replace(/^\/john-carrietravel\//, '').split('#')[0];
    assert(fs.existsSync(path.join('dist', target)), file + ': missing ' + href);
  }
  assert(!/href="(?:eat|relax|cruise-archive)\.html"/.test(html));
}
for (const v of data.videos) assert(fs.readFileSync('dist/videos.html', 'utf8').includes(v.embedUrl.split('/').pop()));
assert(fs.readFileSync('dist/our-first-cruise.html', 'utf8').includes('Taffereal and Lucy'));
assert(fs.readFileSync('dist/index.html', 'utf8').includes('quantum-juneau.jpg'));
assert(fs.readFileSync('dist/stories.html', 'utf8').includes('our-first-cruise.html'));
assert(fs.readFileSync('dist/' + data.upcoming.slug + '.html', 'utf8').includes(data.upcoming.departure));
for (const retired of ['eat', 'relax', 'cruise-archive']) assert(!fs.existsSync('dist/' + retired + '.html'));
const filmPage = fs.readFileSync('dist/videos.html', 'utf8');
assert.equal((filmPage.match(/class="film" /g) || []).length, data.videos.length);
assert(filmPage.includes('data-video="' + data.films.featuredVideoId + '"'));
for (const v of data.videos) assert(fs.existsSync('assets/' + v.embedUrl.split('/').pop() + '.jpg'));
const home = fs.readFileSync('dist/index.html', 'utf8');
assert.equal((home.match(/class="film" /g) || []).length, 3, 'Homepage keeps a curated three-film preview.');
for (const id of ['-8CrYi-A8pg', 'Z00bvTX22YY', 'm69hzZpjbdo']) assert(filmPage.includes(id), 'Preserve original Wix videos.');
// Verify the promised editing workflow: one new content entry generates a real linked page,
// and a changed sailing date propagates to every relevant page without editing templates.
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cruise-content-test-'));
try {
  for (const file of ['build.cjs', 'styles.css', 'app.js', 'assets', 'archive']) fs.cpSync(file, path.join(tempRoot, file), { recursive: true });
  const fixture = JSON.parse(JSON.stringify(data));
  fixture.upcoming.departure = '2028-06-15';
  fixture.stories.push({ slug: 'test-memory', title: 'A & B', status: 'Cruise memory', published: '2026-11-10', image: 'trip-0.jpg', summary: 'A remembered sea day.', paragraphs: ['Safe <text> & a real memory.'] });
  fs.writeFileSync(path.join(tempRoot, 'content.json'), JSON.stringify(fixture));
  execFileSync(process.execPath, ['build.cjs'], { cwd: tempRoot });
  assert(fs.readFileSync(path.join(tempRoot, 'dist/test-memory.html'), 'utf8').includes('Safe &lt;text> &amp; a real memory.'));
  assert(fs.readFileSync(path.join(tempRoot, 'dist/stories.html'), 'utf8').includes('test-memory.html'));
  for (const file of ['index', 'about', 'our-first-cruise', fixture.upcoming.slug]) assert(fs.readFileSync(path.join(tempRoot, 'dist', file + '.html'), 'utf8').includes('June 15, 2028'));
  fixture.stories[1].slug = fixture.stories[0].slug;
  fs.writeFileSync(path.join(tempRoot, 'content.json'), JSON.stringify(fixture));
  assert.throws(() => execFileSync(process.execPath, ['build.cjs'], { cwd: tempRoot, stdio: 'pipe' }), /Command failed/);
} finally {
  const resolved = path.resolve(tempRoot);
  assert(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('cruise-content-test-'));
  fs.rmSync(resolved, { recursive: true, force: true });
}
console.log('PASS: ' + pages.length + ' pages, local links/assets, preserved videos/story, retired pages absent, and content-driven story/date updates.');
