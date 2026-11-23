/**
 * Site-wide configuration and the navigation registry.
 * New papers appear in the navigation automatically once added to src/content/index.js.
 */
import { SECTIONS } from '../content/index.js';

export const SITE = {
  name: 'Maths A',
  title: 'Maths Past Papers',
  course: 'ECU22031 · Mathematical and Statistical Methods A',
  docTitle: 'Mathematical and Statistical Methods A',
  sub: 'ECU22031 · Maths & Stats A',
};

export const NAV_GROUPS = [
  {
    id: 'pages',
    label: 'Pages',
    items: [
      ...SECTIONS.map((p) => ({ id: `section:${p.id}`, label: p.title, href: `#/papers/${p.id}`, accent: p.accent })),
    ],
  },
];
