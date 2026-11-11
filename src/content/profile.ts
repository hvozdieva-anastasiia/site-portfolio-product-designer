// All copy on the site lives here. Everything marked PLACEHOLDER is demo text:
// replace it with your real projects, articles, videos and LinkedIn reviews.

import type { Profile } from './types';

export const profile: Profile = {
  name: 'Anastasiia Hvozdieva',
  role: 'Senior Product Designer', // as on DOU: Yonder Media Mobile
  location: 'Bucharest, Romania',
  // Where the contact form sends mail. Not displayed on the site: it is only
  // used by the mail-app fallback when no form endpoint is set.
  email: 'h.29anastasiia@gmail.com',
  // Formspree endpoint the form posts to. When empty, the form opens the
  // visitor's email app instead.
  formEndpoint: 'https://formspree.io/f/mwloeqgq',

  linkedin: 'https://www.linkedin.com/in/hvozdieva-ai-product-ui-ux-design/',
  linkedinRecommendations:
    'https://www.linkedin.com/in/hvozdieva-ai-product-ui-ux-design/details/recommendations/',
  youtube: 'https://www.youtube.com/@ItDepends_design',
  dou: 'https://dou.ua/users/anastasiia-hvozdieva-1/',
};
