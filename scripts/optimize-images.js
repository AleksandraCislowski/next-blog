const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 1 : 2)} ${units[unitIndex]}`;
}

function parseArgs(argv) {
  const options = {
    dir: "public/images/posts",
    max: 2200,
    quality: 78,
    write: false,
  };

  for (const arg of argv) {
    if (arg === "--write") {
      options.write = true;
    } else if (arg.startsWith("--dir=")) {
      options.dir = arg.slice("--dir=".length);
    } else if (arg.startsWith("--max=")) {
      options.max = Number(arg.slice("--max=".length));
    } else if (arg.startsWith("--quality=")) {
      options.quality = Number(arg.slice("--quality=".length));
    }
  }

  if (!Number.isFinite(options.max) || options.max < 1) {
    throw new Error("--max must be a positive number");
  }

  if (!Number.isFinite(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error("--quality must be between 1 and 100");
  }

  return options;
}

async function listImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return listImages(entryPath);
      }

      if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        return [entryPath];
      }

      return [];
    })
  );

  return files.flat();
}

async function optimizeImage(filePath, options) {
  const input = await fs.readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();
  let transformer = sharp(input, { failOn: "none" })
    .rotate()
    .resize({
      width: options.max,
      height: options.max,
      fit: "inside",
      withoutEnlargement: true,
    });

  if (extension === ".png") {
    transformer = transformer.png({ compressionLevel: 9, palette: true });
  } else {
    transformer = transformer.jpeg({
      quality: options.quality,
      mozjpeg: true,
    });
  }

  const output = await transformer.toBuffer();

  if (options.write && output.length < input.length) {
    await fs.writeFile(filePath, output);
  }

  return {
    filePath,
    before: input.length,
    after: Math.min(output.length, input.length),
    changed: output.length < input.length,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const files = await listImages(options.dir);
  const results = [];

  for (const file of files) {
    results.push(await optimizeImage(file, options));
  }

  const before = results.reduce((sum, result) => sum + result.before, 0);
  const after = results.reduce((sum, result) => sum + result.after, 0);
  const changed = results.filter((result) => result.changed);
  const topSavings = [...results]
    .sort((first, second) => second.before - second.after - (first.before - first.after))
    .slice(0, 10);

  console.log(`${options.write ? "Optimized" : "Dry run for"} ${files.length} images`);
  console.log(`Before: ${formatBytes(before)}`);
  console.log(`After:  ${formatBytes(after)}`);
  console.log(`Saved:  ${formatBytes(before - after)} (${changed.length} files)`);

  if (!options.write) {
    console.log("Run with --write to overwrite files after reviewing the estimate.");
  }

  console.log("\nLargest potential savings:");
  for (const result of topSavings) {
    const saved = result.before - result.after;
    console.log(
      `${formatBytes(saved).padStart(9)}  ${formatBytes(result.before)} -> ${formatBytes(
        result.after
      )}  ${result.filePath}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
