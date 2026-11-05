/**
 * Asset URL resolution utility for Vite, GitHub Pages, and AI Studio
 * Ensures all images load correctly regardless of base path or deployment subpath.
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Strip leading '/public/' or '/src/'
  let clean = path
    .replace(/^\/public\//, '')
    .replace(/^public\//, '')
    .replace(/^\/src\//, '')
    .replace(/^src\//, '')
    .replace(/^\//, '');

  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${clean}`;
};
