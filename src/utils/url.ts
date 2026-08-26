/**
 * Resolves any internal path or asset URL relative to Astro's configured BASE_URL.
 * Ensures seamless operation on GitHub Pages (e.g. /Thulani-portfolio/about) and local dev.
 */
export function getUrl(path: string = ''): string {
  if (!path) return import.meta.env.BASE_URL || '/';

  // If it's already an external HTTP/HTTPS or mailto URL, return unchanged
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:')) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  // Prevent double-prefixing if path is already prefixed with base URL
  if (base !== '/' && (path.startsWith(cleanBase) || path === base)) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
