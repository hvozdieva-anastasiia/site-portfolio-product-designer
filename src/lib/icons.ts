// Brand glyphs come from the simple-icons package on a CDN. The version is
// pinned so the icons never change under the site.
const ICON_BASE = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons';

export const simpleIconUrl = (slug: string) => `${ICON_BASE}/${slug}.svg`;
