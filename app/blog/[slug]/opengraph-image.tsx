import { ImageResponse } from 'next/og';
import { getBlogPostBySlug } from '@/lib/blog';
import { BLOG_IMAGE_GRADIENTS, blogImageGradientIndex } from '@/lib/gradients';

export const runtime = 'nodejs';
export const alt = 'Mue Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const GRADIENT_COLOR_SETS: string[][] = BLOG_IMAGE_GRADIENTS.map((cls) => {
  if (cls.includes('from-orange') && cls.includes('to-purple'))
    return ['#f97316', '#ec4899', '#8b5cf6'];
  if (cls.includes('from-sky') && cls.includes('to-indigo'))
    return ['#0ea5e9', '#6366f1', '#4338ca'];
  if (cls.includes('from-emerald') && cls.includes('to-teal'))
    return ['#10b981', '#06b6d4', '#0d9488'];
  if (cls.includes('from-rose') && cls.includes('to-pink'))
    return ['#f43f5e', '#ec4899', '#db2777'];
  if (cls.includes('from-amber') && cls.includes('to-orange'))
    return ['#f59e0b', '#f97316', '#ea580c'];
  if (cls.includes('from-purple') && cls.includes('to-fuchsia'))
    return ['#8b5cf6', '#d946ef', '#a21caf'];
  if (cls.includes('from-lime') && cls.includes('to-emerald'))
    return ['#84cc16', '#10b981', '#047857'];
  if (cls.includes('from-cyan') && cls.includes('to-blue'))
    return ['#06b6d4', '#3b82f6', '#1e40af'];
  return ['#334155', '#1e293b', '#0f172a'];
});

function wrapTitle(title: string, maxChars = 26): string[] {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = w;
    } else {
      current += ' ' + w;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines.slice(0, 5);
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  const title = post?.frontmatter.title || 'Mue Blog';
  const author = post?.frontmatter.author;
  const reading = post?.readingTime;
  const idx = blogImageGradientIndex(title) % GRADIENT_COLOR_SETS.length;
  const stops = GRADIENT_COLOR_SETS[idx];
  const lines = wrapTitle(title);

  return new ImageResponse(
    (
      <svg
        width={size.width}
        height={size.height}
        viewBox={`0 0 ${size.width} ${size.height}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={title}
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            {stops.map((c, i) => (
              <stop key={c + i} offset={`${(i / (stops.length - 1)) * 100}%`} stopColor={c} />
            ))}
          </linearGradient>
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={2}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.05" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <rect width="100%" height="100%" fill="url(#grad)" filter="url(#grain)" opacity="0.35" />
        <g transform="translate(80 120)">
          {lines.map((line, i) => (
            <text
              key={i}
              x={0}
              y={i * 68}
              fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
              fontSize={60}
              fontWeight={600}
              fill="#ffffff"
              letterSpacing="1"
            >
              {line}
            </text>
          ))}
        </g>
        <g
          transform="translate(80 560)"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
          fontSize={30}
          fill="#ffffff"
          fontWeight={500}
          opacity="0.95"
        >
          {author && (
            <text x={0} y={0}>
              By {author}
            </text>
          )}
          {reading && (
            <text x={author ? 320 : 0} y={0}>
              {reading}
            </text>
          )}
          <text x={reading ? 640 : author ? 320 : 0} y={0}>
            Mue
          </text>
        </g>
      </svg>
    ),
    { ...size },
  );
}
