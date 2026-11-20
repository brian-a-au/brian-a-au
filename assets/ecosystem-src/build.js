// Builds a hand-drawn (Excalidraw style) ecosystem diagram as two self-contained SVGs.
// Lines come from rough.js. Text is Excalifont (OFL) converted to paths, so no font loads on GitHub.
// Run: npm install && node build.js   (writes ../ecosystem-light.svg and ../ecosystem-dark.svg)
const fs = require("fs");
const rough = require("roughjs");
const opentype = require("opentype.js");

const path = require("path");
const wawoff2 = require("wawoff2");
let font;

// Excalifont ships as several woff2 subsets inside @excalidraw/excalidraw. Pick the Latin one.
async function loadFont() {
  const dir = path.join(path.join(__dirname, "node_modules/@excalidraw/excalidraw"), "dist/prod/fonts/Excalifont");
  for (const f of fs.readdirSync(dir)) {
    const ttf = await wawoff2.decompress(fs.readFileSync(path.join(dir, f)));
    const candidate = opentype.parse(ttf.buffer.slice(ttf.byteOffset, ttf.byteOffset + ttf.byteLength));
    if ([..."Aaz_-/?"].every((c) => candidate.charToGlyph(c).index !== 0)) return candidate;
  }
  throw new Error("No Latin Excalifont subset found");
}
const W = 1000, H = 720;

const THEMES = {
  light: {
    bg: "#ffffff", ink: "#1e1e1e", soft: "#495057", fillOpacity: 0.9,
    api: ["#868e96", "#e9ecef"], doc: ["#1971c2", "#a5d8ff"], mon: ["#e8590c", "#ffc078"],
    assess: ["#2f9e44", "#b2f2bb"], snap: ["#f08c00", "#ffec99"], skills: ["#6741d9", "#d0bfff"],
  },
  dark: {
    bg: "#0d1117", ink: "#e6edf3", soft: "#ced4da", fillOpacity: 0.3,
    api: ["#adb5bd", "#495057"], doc: ["#74c0fc", "#1971c2"], mon: ["#ffa94d", "#d9480f"],
    assess: ["#8ce99a", "#2b8a3e"], snap: ["#ffd43b", "#e67700"], skills: ["#b197fc", "#5f3dc4"],
  },
};

function build(themeName) {
  const T = THEMES[themeName];
  const gen = rough.generator();
  const out = [];
  let seed = 7;
  const base = () => ({ seed: seed++, roughness: 1.1, bowing: 1, strokeWidth: 1.8 });

  function emit(drawable, fillOpacity) {
    for (const p of gen.toPaths(drawable)) {
      const isFill = p.fill === "none" && drawable.options.fill && p.stroke === drawable.options.fill;
      out.push(`<path d="${p.d.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(1))}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill}"` +
        (isFill ? ` stroke-opacity="${fillOpacity}"` : "") +
        (drawable.options.strokeLineDash && !isFill ? ` stroke-dasharray="${drawable.options.strokeLineDash.join(" ")}"` : "") +
        ` stroke-linecap="round" stroke-linejoin="round"/>`);
    }
  }

  function roundRect(x, y, w, h, r) {
    return `M${x + r} ${y} L${x + w - r} ${y} Q${x + w} ${y} ${x + w} ${y + r} L${x + w} ${y + h - r} ` +
      `Q${x + w} ${y + h} ${x + w - r} ${y + h} L${x + r} ${y + h} Q${x} ${y + h} ${x} ${y + h - r} ` +
      `L${x} ${y + r} Q${x} ${y} ${x + r} ${y} Z`;
  }

  function box(x, y, w, h, [stroke, fill], extra = {}) {
    emit(gen.path(roundRect(x, y, w, h, 14), {
      ...base(), stroke, fill, fillStyle: "hachure", disableMultiStrokeFill: true, hachureGap: 8, fillWeight: 1.2, hachureAngle: -41, ...extra,
    }), T.fillOpacity);
  }

  // Text: each letter placed by hand (opentype.js shaping breaks on this font's GSUB rules).
  function glyphs(str) { return [...str].map((c) => font.charToGlyph(c)); }
  function width(str, size) {
    const scale = size / font.unitsPerEm;
    return glyphs(str).reduce((w, g) => w + g.advanceWidth * scale, 0);
  }
  function pathData(path, dp = 1) {
    const n = (v) => (Math.round(v * 10 ** dp) / 10 ** dp).toString();
    return path.commands.map((c) =>
      c.type === "M" || c.type === "L" ? `${c.type}${n(c.x)} ${n(c.y)}` :
      c.type === "Q" ? `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}` :
      c.type === "C" ? `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}` : "Z").join("");
  }
  const defs = new Map(); // glyph index -> path at 1 unit = 1 font unit
  function text(str, x, y, size, color, align = "center", maxW = Infinity) {
    let s = size;
    while (width(str, s) > maxW && s > 10) s -= 0.5;
    const w = width(str, s), scale = s / font.unitsPerEm;
    let cx = align === "center" ? x - w / 2 : align === "right" ? x - w : x;
    const uses = [];
    for (const g of glyphs(str)) {
      if (g.index === 0) throw new Error(`missing glyph in "${str}"`);
      if (g.path.commands.length) {
        if (!defs.has(g.index)) defs.set(g.index, pathData(g.getPath(0, 0, font.unitsPerEm), 0));
        uses.push(`<use href="#g${g.index}" x="${(cx / scale).toFixed(0)}"/>`);
      }
      cx += g.advanceWidth * scale;
    }
    out.push(`<g fill="${color}" transform="translate(0 ${y}) scale(${scale.toFixed(5)})">${uses.join("")}</g>`);
  }

  function arrow(x1, y1, x2, y2, color = T.ink, bend = 0) {
    const mx = (x1 + x2) / 2 + bend, my = (y1 + y2) / 2;
    emit(gen.path(`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`, { ...base(), stroke: color, roughness: 0.9 }));
    // Open arrowhead, like Excalidraw's default.
    const a = Math.atan2(y2 - my, x2 - mx), L = 13, spread = 0.45;
    for (const s of [-1, 1]) {
      const hx = x2 - L * Math.cos(a + s * spread), hy = y2 - L * Math.sin(a + s * spread);
      emit(gen.line(x2, y2, hx, hy, { ...base(), stroke: color, roughness: 0.6 }));
    }
  }

  function tool(x, y, w, h, name, sub, colors) {
    box(x, y, w, h, colors);
    text(name, x + w / 2, y + 40, 23, T.ink, "center", w - 18);
    text(sub, x + w / 2, y + 68, 17, T.soft, "center", w - 18);
  }

  // Title and note
  text("how my tools fit together", 36, 52, 32, T.ink, "left");
  text("all read-only and open source", W - 36, 50, 18, T.soft, "right");

  // Adobe APIs
  box(60, 88, 350, 56, T.api);
  text("Adobe Analytics API", 235, 124, 22, T.ink, "center", 320);
  box(590, 88, 350, 56, T.api);
  text("Customer Journey Analytics API", 765, 124, 22, T.ink, "center", 320);

  // Lane tags
  text("monitor", 26, 214, 17, T.mon[0], "left");
  text("monitor", 974, 214, 17, T.mon[0], "right");
  text("document", 500, 214, 17, T.doc[0], "center");

  // Row of tools that call Adobe
  const top = 226, bh = 88, bw = 196;
  tool(20, top, bw, bh, "aa-health-duckdb", "is data still flowing?", T.mon);
  tool(256, top, bw, bh, "aa_auto_sdr", "document a report suite", T.doc);
  tool(548, top, bw, bh, "cja_auto_sdr", "document a data view", T.doc);
  tool(784, top, bw, bh, "cja-audit-log-monitor", "who changed what?", T.mon);

  arrow(150, 146, 118, 222, T.ink, -6);
  arrow(320, 146, 354, 222, T.ink, 6);
  arrow(680, 146, 646, 222, T.ink, -6);
  arrow(850, 146, 882, 222, T.ink, 6);

  // Monitor outputs
  arrow(118, 318, 118, 372, T.mon[0]);
  text("HTML report", 118, 400, 19, T.ink);
  text("and daily alerts", 118, 424, 19, T.ink);
  arrow(882, 318, 882, 372, T.mon[0]);
  text("alerts to", 882, 400, 19, T.ink);
  text("Slack or a webhook", 882, 424, 19, T.ink);

  // Snapshots
  emit(gen.ellipse(500, 400, 250, 66, {
    ...base(), stroke: T.snap[0], fill: T.snap[1], fillStyle: "hachure", disableMultiStrokeFill: true, hachureGap: 8, fillWeight: 1.2,
  }), T.fillOpacity);
  text("SDR snapshots", 500, 398, 22, T.ink);
  text("(JSON files)", 500, 420, 16, T.soft);
  arrow(354, 318, 410, 372, T.doc[0], 4);
  arrow(646, 318, 590, 372, T.doc[0], -4);

  // Assess
  text("assess", 268, 546, 17, T.assess[0], "right");
  tool(282, 486, bw, bh, "sdr-grader", "a report card", T.assess);
  tool(522, 486, bw, bh, "sdr-visualizer", "a catalog to browse", T.assess);
  arrow(452, 434, 392, 482, T.snap[0], -4);
  arrow(548, 434, 608, 482, T.snap[0], 4);

  // Claude Code skills band
  box(20, 616, W - 40, 82, T.skills, { strokeLineDash: [9, 7], hachureGap: 9 });
  text("Claude Code skills", 500, 652, 25, T.ink);
  text("ask in plain words, and Claude runs any of these tools for you", 500, 682, 18, T.soft);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" ` +
    `aria-label="How the tools fit together: the Adobe Analytics and CJA APIs feed aa_auto_sdr, cja_auto_sdr, aa-health-duckdb and cja-audit-log-monitor. ` +
    `The SDR tools write snapshots that sdr-grader and sdr-visualizer read. Claude Code skills run all of them.">` +
    `<defs>${[...defs].map(([i, d]) => `<path id="g${i}" d="${d}"/>`).join("")}</defs>` +
    `<rect width="${W}" height="${H}" fill="${T.bg}"/>` + out.join("") + `</svg>\n`;
}

(async () => {
  font = await loadFont();
  const outDir = path.join(__dirname, "..");
  for (const t of Object.keys(THEMES)) fs.writeFileSync(path.join(outDir, `ecosystem-${t}.svg`), build(t));
  console.log(`wrote ecosystem-light.svg and ecosystem-dark.svg to ${outDir}`);
})();
