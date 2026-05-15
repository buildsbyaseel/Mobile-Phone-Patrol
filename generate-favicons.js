const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const src = path.join(dir, 'favicon-source.svg');

function sharp(args) {
  execSync(`npx --yes sharp-cli -i "${src}" ${args}`, { stdio: 'inherit', cwd: dir });
}

// 192x192
sharp(`-o "${dir}" -f png resize 192 192`);
fs.renameSync(path.join(dir, 'favicon-source.png'), path.join(dir, 'favicon-192.png'));
console.log('✓ favicon-192.png');

// 48x48
sharp(`-o "${dir}" -f png resize 48 48`);
fs.renameSync(path.join(dir, 'favicon-source.png'), path.join(dir, 'favicon.png'));
console.log('✓ favicon.png (48x48)');

// favicon.ico — embed the 48x48 PNG directly (supported by all modern browsers)
const png = fs.readFileSync(path.join(dir, 'favicon.png'));
const HEADER = 6, ENTRY = 16;
const buf = Buffer.alloc(HEADER + ENTRY + png.length);
buf.writeUInt16LE(0, 0);
buf.writeUInt16LE(1, 2);
buf.writeUInt16LE(1, 4);
buf.writeUInt8(48, 6);
buf.writeUInt8(48, 7);
buf.writeUInt8(0, 8);
buf.writeUInt8(0, 9);
buf.writeUInt16LE(1, 10);
buf.writeUInt16LE(32, 12);
buf.writeUInt32LE(png.length, 14);
buf.writeUInt32LE(HEADER + ENTRY, 18);
png.copy(buf, HEADER + ENTRY);
fs.writeFileSync(path.join(dir, 'favicon.ico'), buf);
console.log('✓ favicon.ico');
