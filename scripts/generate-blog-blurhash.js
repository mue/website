const fs = require('fs/promises');
const path = require('path');

const YAML = require('yaml');
const sharp = require('sharp');

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, yamlSource, content] = match;
  try {
    const data = yamlSource?.trim() ? YAML.parse(yamlSource) : {};
    return { data: data ?? {}, content };
  } catch {
    return { data: {}, content: raw };
  }
}

function stringifyFrontmatter(content, data) {
  const yamlText = YAML.stringify(data ?? {}).trimEnd();
  const body = content.replace(/^\s+/, '');
  return `---\n${yamlText}\n---\n\n${body}`;
}

async function generateBlurDataURL(imagePath) {
  if (!imagePath?.startsWith('/')) return undefined;

  try {
    const buffer = await sharp(path.join(PUBLIC_DIR, imagePath))
      .resize(8, 8, { fit: 'inside' })
      .blur()
      .toFormat('webp')
      .toBuffer();

    return `data:image/webp;base64,${buffer.toString('base64')}`;
  } catch (e) {
    console.error('Failed to generate blurhash for', imagePath, e);
    return undefined;
  }
}

async function processBlogFile(file) {
  const filePath = path.join(BLOG_DIR, file);
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = parseFrontmatter(raw);

  if (data.image && !data.imagePlaceholder) {
    const placeholder = await generateBlurDataURL(data.image);

    if (placeholder) {
      data.imagePlaceholder = placeholder;
      const newRaw = stringifyFrontmatter(content, data);

      await fs.writeFile(filePath, newRaw, 'utf8');
      console.log('Updated', file);
    }
  }
}

async function main() {
  const entries = await fs.readdir(BLOG_DIR);

  for (const entry of entries) {
    if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      await processBlogFile(entry);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
