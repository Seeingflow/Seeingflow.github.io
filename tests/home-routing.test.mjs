import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("the main homepage declares the clean public URL as canonical", () => {
  assert.match(read("index.html"), /<link rel="canonical" href="https:\/\/seeingflow\.sg\/">/);
  assert.match(read("index.html"), /id="heroTitle"/);
});

test("public navigation never links to the dated homepage", () => {
  const files = readdirSync(new URL("../", import.meta.url))
    .filter((file) => /\.(html|js)$/.test(file) && file !== "home-20260620.html");
  for (const file of files) assert.ok(!read(file).includes("home-20260620.html"), file);
});

for (const [file, path] of [["home-20260620.html", "home-20260620.html"], ["home/index.html", "home/"]]) {
  test(`${file} redirects old visits to the homepage without duplicating its content`, () => {
    const html = read(file);
    assert.match(html, /<link rel="canonical" href="https:\/\/seeingflow\.sg\/">/);
    assert.match(html, /http-equiv="refresh"/);
    assert.ok(!html.includes('id="heroTitle"'));
    const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
    assert.ok(script, "automatic redirect script exists");
    for (const base of ["https://seeingflow.sg/", "file:///project/"]) {
      const current = new URL(`${path}?source=old#solutions`, base);
      let destination;
      const location = {
        href: current.href, protocol: current.protocol,
        search: current.search, hash: current.hash,
        replace: (url) => { destination = String(url); }
      };
      vm.runInNewContext(script, { URL, window: { location } });
      const expected = new URL(base.startsWith("file:") ? "index.html" : "./", base);
      expected.search = current.search;
      expected.hash = current.hash;
      assert.equal(destination, expected.href);
    }
  });
}
