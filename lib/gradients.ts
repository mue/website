// Shared gradient constants and hashing so they can be used in both client and server (OG) contexts.
// Keep in sync with visual intent of BlogImage gradients.
export const BLOG_IMAGE_GRADIENTS = [
  'bg-gradient-to-br from-pink-500/70 via-rose-500/60 to-orange-400/70 dark:from-pink-600 dark:via-fuchsia-600 dark:to-orange-500',
  'bg-gradient-to-br from-indigo-500/70 via-violet-500/60 to-purple-400/70 dark:from-indigo-600 dark:via-violet-700 dark:to-purple-600',
  'bg-gradient-to-br from-emerald-500/70 via-teal-500/60 to-cyan-400/70 dark:from-emerald-600 dark:via-teal-600 dark:to-cyan-500',
  'bg-gradient-to-br from-blue-500/70 via-sky-500/60 to-cyan-400/70 dark:from-blue-600 dark:via-sky-600 dark:to-cyan-500',
  'bg-gradient-to-br from-amber-500/70 via-yellow-500/60 to-lime-400/70 dark:from-amber-600 dark:via-yellow-600 dark:to-lime-500',
  'bg-gradient-to-br from-fuchsia-500/70 via-pink-500/60 to-rose-400/70 dark:from-fuchsia-600 dark:via-pink-600 dark:to-rose-500',
  'bg-gradient-to-br from-slate-500/70 via-gray-500/60 to-zinc-400/70 dark:from-slate-600 dark:via-gray-600 dark:to-zinc-500',
  'bg-gradient-to-br from-teal-500/70 via-green-500/60 to-lime-400/70 dark:from-teal-600 dark:via-green-600 dark:to-lime-500',
];

export function blogImageGradientIndex(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 33 + key.charCodeAt(i)) >>> 0;
  return hash % BLOG_IMAGE_GRADIENTS.length;
}
