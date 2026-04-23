function encodeSvg(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getBlurDataURL({
  width = 16,
  height = 12,
  baseColor = "#ece7dc",
  highlightColor = "#f7f3ea",
} = {}) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${baseColor}" />
          <stop offset="50%" stop-color="${highlightColor}" />
          <stop offset="100%" stop-color="${baseColor}" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="${baseColor}" />
      <rect width="${width}" height="${height}" fill="url(#g)">
        <animate attributeName="x" from="-${width}" to="${width}" dur="1.2s" repeatCount="indefinite" />
      </rect>
    </svg>
  `;

  return encodeSvg(svg);
}

