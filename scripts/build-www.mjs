import { mkdirSync, cpSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

const root = process.cwd();
const www = join(root, 'www');
rmSync(www, { recursive: true, force: true });
mkdirSync(www, { recursive: true });

const FILES = ['index.html', 'manifest.json', 'sw.js'];
const DIRS = ['css', 'js', 'icons', 'pitch'];

for (const f of FILES) {
    const src = join(root, f);
    if (!existsSync(src)) throw new Error('Fehlt: ' + f);
    cpSync(src, join(www, f));
}
for (const d of DIRS) {
    const src = join(root, d);
    if (!existsSync(src)) throw new Error('Fehlt: ' + d);
    cpSync(src, join(www, d), { recursive: true });
}
console.log('www/ wurde erzeugt (index.html, css, js, icons, manifest, sw.js, pitch)');