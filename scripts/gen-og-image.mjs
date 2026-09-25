import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const W = 1200;
const H = 630;

const px = Buffer.alloc(W * H * 4);

function set(x, y, r, g, b, a) {
  const i = (y * W + x) * 4;
  px[i] = r;
  px[i + 1] = g;
  px[i + 2] = b;
  px[i + 3] = a;
}

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function fillBg() {
  const top = [94, 106, 210];
  const mid = [79, 90, 192];
  const bottom = [63, 75, 184];
  for (let y = 0; y < H; y++) {
    const t = y / (H - 1);
    const [r, g, b] = t < 0.5 ? [lerp(top[0], mid[0], t * 2), lerp(top[1], mid[1], t * 2), lerp(top[2], mid[2], t * 2)] : [lerp(mid[0], bottom[0], (t - 0.5) * 2), lerp(mid[1], bottom[1], (t - 0.5) * 2), lerp(mid[2], bottom[2], (t - 0.5) * 2)];
    for (let x = 0; x < W; x++) {
      set(x, y, r, g, b, 255);
    }
  }
}

function drawWaves() {
  const waves = [
    { y: 470, amp: 26, freq: 0.0065, thick: 26, alpha: 20 },
    { y: 512, amp: 22, freq: 0.005, thick: 18, alpha: 34 },
    { y: 548, amp: 20, freq: 0.008, thick: 12, alpha: 56 },
    { y: 578, amp: 16, freq: 0.006, thick: 8, alpha: 88 },
  ];
  for (const w of waves) {
    for (let x = 0; x < W; x++) {
      const base = w.y + Math.sin(x * w.freq + w.y) * w.amp;
      for (let dy = -w.thick; dy <= w.thick; dy++) {
        const y = Math.round(base + dy);
        if (y < 0 || y >= H) continue;
        const i = (y * W + x) * 4;
        const a = px[i + 3] || 255;
        const existingAlpha = 255 - (px[i + 3] ?? 0);
        const mergeAlpha = w.alpha + existingAlpha * (1 - w.alpha / 255);
        void a;
        px[i] = 255 - Math.round((255 - px[i]) * (1 - w.alpha / 255));
        px[i + 1] = 255 - Math.round((255 - px[i + 1]) * (1 - w.alpha / 255));
        px[i + 2] = 255 - Math.round((255 - px[i + 2]) * (1 - w.alpha / 255));
        px[i + 3] = Math.round(mergeAlpha);
      }
    }
  }
}

function drawLaneLines() {
  const xs = [0.2, 0.4, 0.6, 0.8];
  const top = 0;
  const bottom = 470;
  for (const fx of xs) {
    const cx = Math.round(W * fx);
    for (let y = top; y < bottom; y += 26) {
      const ry = y + 12;
      const rr = 5;
      for (let dy = -rr; dy <= rr; dy++) {
        for (let dx = -rr; dx <= rr; dx++) {
          if (dx * dx + dy * dy <= rr * rr) {
            const x = cx + dx;
            const yy = ry + dy;
            if (x < 0 || x >= W || yy < 0 || yy >= H) continue;
            const i = (yy * W + x) * 4;
            px[i] = 255 - Math.round((255 - px[i]) * 0.55);
            px[i + 1] = 255 - Math.round((255 - px[i + 1]) * 0.55);
            px[i + 2] = 255 - Math.round((255 - px[i + 2]) * 0.55);
            px[i + 3] = 255 - Math.round((255 - px[i + 3]) * 0.45);
          }
        }
      }
    }
  }
}

function drawAccentBars() {
  const bar = { x: 70, y: 40, w: 90, h: 10 };
  for (let yy = bar.y; yy < bar.y + bar.h; yy++) {
    for (let xx = bar.x; xx < bar.x + bar.w; xx++) {
      set(xx, yy, 168, 184, 255, 235);
    }
  }
}

let crcTable = null;
function getCrcTable() {
  if (crcTable) return crcTable;
  crcTable = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crcTable[n] = c;
  }
  return crcTable;
}

function crc32(buf) {
  const table = getCrcTable();
  let c = ~0;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

function encodePng() {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const raw = Buffer.alloc((W * 4 + 1) * H);
  for (let y = 0; y < H; y++) {
    raw[y * (W * 4 + 1)] = 0;
    px.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

fillBg();
drawWaves();
drawLaneLines();
drawAccentBars();

const out = fileURLToPath(new URL('../public/og-image.png', import.meta.url));
writeFileSync(out, encodePng());
console.log(`wrote ${out} (${W}x${H}, ${(Buffer.from(px).length / (1024 * 1024)).toFixed(2)} MB raw)`);