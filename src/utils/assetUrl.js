export function assetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
}
