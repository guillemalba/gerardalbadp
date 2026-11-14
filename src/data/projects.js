// Single source of truth for the portfolio content.
// Titles, durations, thumbnails and descriptions come from Vimeo at runtime (see vimeo.js).

export const REEL_ID = '522837592';

export const CATEGORIES = [
  {
    slug: 'music-videos',
    title: 'Music Videos',
    short: 'Music',
    cover: require('@/assets/img/musicvideos.jpg'),
  },
  {
    slug: 'commercials',
    title: 'Commercials',
    short: 'Commercial',
    cover: require('@/assets/img/commercials.jpg'),
  },
  {
    slug: 'underwater',
    title: 'Underwater',
    short: 'Underwater',
    cover: require('@/assets/img/underwater.jpg'),
  },
  {
    slug: 'films',
    title: 'Films',
    short: 'Film',
    cover: require('@/assets/img/films.jpg'),
  },
];

// Each project is one Vimeo video; a project can belong to more than one category.
export const PROJECTS = [
  { id: '522564568', categories: ['music-videos'] },
  { id: '522377522', categories: ['music-videos', 'underwater'] },
  { id: '491834523', categories: ['music-videos'] },
  { id: '1005402186', categories: ['music-videos'] },
  { id: '1135923915', categories: ['commercials'] },
  { id: '1135450718', categories: ['commercials'] },
  { id: '1135450800', categories: ['commercials'] },
  { id: '1135921789', categories: ['commercials'] },
  { id: '1135922177', categories: ['commercials'] },
  { id: '290744844', categories: ['commercials'] },
  { id: '199707225', categories: ['commercials'] },
  { id: '189584267', categories: ['commercials'] },
  { id: '522549222', categories: ['commercials', 'underwater'] },
  { id: '522726870', categories: ['underwater', 'films'] },
];

export function projectsIn(slug) {
  return slug ? PROJECTS.filter(p => p.categories.includes(slug)) : PROJECTS;
}

export function categoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug);
}

export const CONTACT = {
  name: 'Gerard Alba Payá',
  email: 'gerardalbadp@gmail.com',
  phone: '+34 628 235 110',
  phoneHref: '+34628235110',
  instagram: 'https://instagram.com/gerardalbadp',
  vimeo: 'https://vimeo.com/gerardalba',
  cv: 'gerardalba_cv.pdf',
};
