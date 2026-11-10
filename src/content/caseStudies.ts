import type { CaseStudy, Screen } from './types';

// Case studies. Every figure comes from the case presentation in Figma.
// Screens are exported from the final designs at 720 px wide and live in
// public/cases/<slug>/.

/** A screen exporter for one case: file name, alt text, height, width. */
const shotsFor =
  (slug: string) =>
  (name: string, alt: string, height: number, width = 720): Screen => ({
    src: `${import.meta.env.BASE_URL}cases/${slug}/${name}.webp`,
    alt,
    width,
    height,
  });

const shot = shotsFor('yezzz');
const adShot = shotsFor('ad-management-app');
const esimShot = shotsFor('yo-esim');

const screens = {
  before: shot(
    'before',
    'Old Yezzz! screen in the Silpo app: a plan card with a footnote about the condition',
    1495,
  ),
  homeEntry: shot(
    'home-entry',
    'Silpo app home with the new Yezzz! banner and a Yezzz! tile among the quick actions',
    1547,
  ),
  intro: shot(
    'intro',
    'Onboarding screen: “Mobile service Yezzz!” with an illustration and a Next button',
    1577,
  ),
  offer: shot(
    'offer',
    'Offer page: 750 minutes, 15 GB and unlimited socials, the conditions, and four ways to connect',
    2056,
  ),
  connect: shot(
    'connect',
    'Choose how to connect: switch from lifecell, keep your number, order an eSIM or activate a starter pack',
    1597,
  ),
  number: shot(
    'number',
    'Phone number entry with a numeric keypad and a Continue button',
    1559,
  ),
  requestSent: shot(
    'request-sent',
    'Waiting state: the request to change the plan has been sent to the operator',
    1597,
  ),
  porting: shot(
    'porting',
    'Keep your number: a four-step guide to porting a number to Yezzz!',
    1159,
    649,
  ),
  accountActive: shot(
    'account-active',
    'Account after activation: active plan, phone number, validity date, balance, minutes and data',
    1577,
  ),
  tariffDetails: shot(
    'tariff-details',
    'Plan details expanded: data and minutes by type, with unlimited socials and messengers',
    1597,
  ),
  account: shot(
    'account',
    'Account with a goal tracker: 1,000 of 2,000 ₴ spent before the deadline, then balance and usage rings',
    1595,
  ),
  usage: shot(
    'usage',
    'Balance, remaining minutes and data as rings, plan details and a referral bonus',
    1597,
  ),
  help: shot(
    'help',
    'Help hub: change number, your plan details, frequently asked questions, about Yezzz!',
    1597,
  ),
  faq: shot(
    'faq',
    'Frequently asked questions about the free plan conditions, purchases and number porting',
    1780,
  ),
};

const adScreens = {
  onboarding: adShot(
    'onboarding',
    'Welcome screen with a photo, a short line about the app and buttons to continue with Google or Facebook',
    1560,
  ),
  login: adShot(
    'login',
    'Sign-in screen asking for an email, with a Continue button and a link to sign up',
    1560,
  ),
  home: adShot(
    'home',
    'Home: last campaigns with All, Active and Draft filters, a New Campaign card, player status tiles and a five-tab bar',
    1560,
  ),
  menu: adShot(
    'menu',
    'Menu sheet over the home screen with My Profile, Report, Payment History and Settings',
    1560,
  ),
  campaigns: adShot(
    'campaigns',
    'Campaign list with search and sort, and cards showing client, dates, duration, price per channel and status',
    1560,
  ),
  campaignActions: adShot(
    'campaign-actions',
    'Bottom sheet for a campaign: Start Campaign, Stop Campaign, Edit and Delete',
    1560,
  ),
  createCampaign: adShot(
    'create-campaign',
    'Add Campaign form with a date range, name, client, channel, player tags, a running total and a Pay button',
    1671,
  ),
  chooseDate: adShot(
    'choose-date',
    'Date range picker in a bottom sheet with two months, the selected range highlighted and a Clear date link',
    1671,
  ),
  mediaGrid: adShot(
    'media-grid',
    'Media library as a grid of video thumbnails with search, sort and a switch to list view',
    1560,
  ),
  channels: adShot(
    'channels',
    'Channels: a featured playlist card and a list of channels with players, media items and duration',
    1560,
  ),
  channelActions: adShot(
    'channel-actions',
    'Bottom sheet for a channel: Change Schedule, Assign New Player, Edit and Delete',
    1560,
  ),
  playersMap: adShot(
    'players-map',
    'Players on a map with pins, a Map and Details switch and priority filters for online, active and offline',
    1560,
  ),
  playersShare: adShot(
    'players-share',
    'Share sheet for a player with Messages, Mail, Facebook and Messenger, plus Copy Link and Share With Contact',
    1560,
  ),
  payment: adShot(
    'payment',
    'Payment: credit card or PayPal, card details and a Pay 1,400$ button',
    1560,
  ),
  paymentHistory: adShot(
    'payment-history',
    'Payment History: searchable list of campaigns with client, dates and price per channel',
    1560,
  ),
};

const esimScreens = {
  store: esimShot(
    'store',
    'eSIM Shop with a “Where to?” search field, a Local, Regional and Global switch and a list of countries with flags',
    1558,
  ),
  regional: esimShot(
    'regional',
    'Sheet of available countries with a search field, flags and the supported networks for each country',
    1558,
  ),
  localPlans: esimShot(
    'local-plans',
    'United Kingdom plans: a discount banner and plan cards with data, price, validity and networks, and a Best value tag on 3 GB',
    1558,
  ),
  requirements: esimShot(
    'requirements',
    'Info screen: before you start, the phone must support eSIM and be unlocked and not jailbroken, with a confirmation checkbox',
    1558,
  ),
  checkout: esimShot(
    'checkout',
    'Check Out for United Kingdom 3 GB: plan details, an international calls offer, a YOYO$ discount slider and an order summary',
    1994,
  ),
  payment: esimShot(
    'payment',
    'Payment: saved cards, Apple Pay, a new card option and a Buy Now button',
    1558,
  ),
  myEsims: esimShot(
    'my-esims',
    'My eSIMs with Active and Expired tabs and plan cards for Ukraine, Caribbean Explorer and World Explorer, each with Details and Top-Up',
    2016,
  ),
  plan: esimShot(
    'plan',
    'Ukraine plan: a usage ring with 1.5 GB left, a Top-Up button, packages with their status, and links to FAQ and Help Center',
    2258,
  ),
  futurePlan: esimShot(
    'future-plan',
    'A plan bought for later: a pending package and a note that it activates automatically on connecting to the destination network',
    1820,
  ),
  expired: esimShot(
    'expired',
    'Expired Caribbean Explorer plan with 0 GB left, expired packages and a Buy Again button',
    2201,
  ),
  iosDirect: esimShot(
    'ios-direct',
    'iOS install guide, Direct tab: a link to start installation directly and a Start button',
    1558,
  ),
  qr: esimShot(
    'qr',
    'iOS install guide, QR Code tab: the eSIM QR code, a hint on how to scan it and a Share QR Code action',
    1558,
  ),
  androidIntro: esimShot(
    'android-intro',
    'Android install guide intro: a note that steps differ by phone model and a tip to have a good connection',
    1558,
  ),
  androidSettings: esimShot(
    'android-settings',
    'Android install guide, step one: head into Settings, then Connections, then SIM manager',
    1558,
  ),
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'yezzz',
    next: { title: 'YO eSIM', slug: 'yo-esim' },
    hero: {
      kicker: 'Case study · Yezzz! by Silpo',
      title:
        'Turning a grocery perk into a mobile plan people actually activate.',
      lead: 'Yezzz! is a mobile operator by Silpo, Ukraine’s largest supermarket chain: the plan becomes free when you shop enough. I redesigned the journey from the first look at the offer to activation and everyday use inside the Silpo app.',
      facts: [
        { label: 'Role', value: 'Product Designer, end-to-end' },
        { label: 'Scope', value: 'Offer, activation, account, self-service' },
        { label: 'Platform', value: 'Silpo app · iOS & Android' },
        { label: 'Business domain', value: 'Retail telecom' },
      ],
      screens: [screens.offer, screens.connect, screens.account],
    },
    overview: {
      problem:
        'Of 138,482 people who opened the Yezzz! screen in 30 days, only 3,251 activated: 2.35%. The free plan read like a riddle, and 87% left after the first step.',
      solution:
        'Research and analytics produced 15 hypotheses. I scored them with ICE, took the top five into development and rebuilt the journey around one question per step.',
      impact:
        'The new flow shipped in the Silpo app. It targets +6–7% funnel conversion and is tracked on four metrics agreed upfront: activation, first-month goal, retention and support load.',
    },
    role: {
      title: 'Product Designer, end-to-end',
      text: 'I owned the experience from audit to handoff: framing the problem with the product team, mapping the activation paths, designing the UI in the Silpo app design system and writing the in-app content that explains the deal.',
      scope: [
        'Product & UX audit of the existing flow',
        'User flows for 4 connection paths',
        'Offer page & information architecture',
        'Activation, waiting & error states',
        'Account dashboard with goal tracking',
        'Self-service FAQ & UX copy',
        'Success metrics & dev handoff',
      ],
    },
    problem: {
      title: 'Users saw the offer, but rarely activated it.',
      text: 'Yezzz! was already available inside the Silpo app, but the activation funnel showed a critical gap between awareness and completion. Some users didn’t notice the offer among other features, while many who opened the page never finished the connection flow.',
      before: screens.before,
      dropOff: {
        value: '87%',
        label: 'drop-off after the first step',
        note: 'Users opened Yezzz! but didn’t proceed to phone number entry.',
      },
      funnel: {
        title: 'Where users dropped off',
        period: 'Sample · 30 days',
        steps: [
          { label: 'Viewed Yezzz! screen', count: 138482, share: '100%' },
          {
            label: 'Reached phone number entry',
            count: 18224,
            share: '13.16%',
          },
          { label: 'Clicked “Add number”', count: 10275, share: '7.42%' },
          { label: 'Reached OTP entry', count: 3310, share: '2.39%' },
          { label: 'Activated Yezzz!', count: 3251, share: '2.35%' },
        ],
        note: 'Out of every 100 users who opened the Yezzz! screen, only about 2 completed activation. The biggest drop happened right after the first step: 87% didn’t move forward.',
      },
      stats: [
        {
          value: '138,482',
          label: 'Viewed the Yezzz! screen',
          note: 'Unique users who reached the offer page during the analysed period.',
        },
        {
          value: '3,251',
          label: 'Activated Yezzz!',
          note: 'Users who completed the full connection flow and started using the service.',
        },
        {
          value: '2.35%',
          label: 'Activation conversion rate',
          note: 'The gap between exposure and activation became the central question of this case.',
        },
      ],
      frictionTitle:
        'Walking the journey end to end, four friction points stood out',
      friction: [
        {
          title: 'The offer didn’t add up',
          text: '“Free” came with a condition people discovered too late. It wasn’t clear what you get, what you pay and when.',
        },
        {
          title: 'Four doors, no signs',
          text: 'Switching from lifecell, porting a number, ordering an eSIM and activating a starter pack looked like equal options in operator jargon. People picked the wrong path or gave up.',
        },
        {
          title: 'Blind after activation',
          text: 'Nothing showed how close you were to the 2,000 ₴ goal, so the first 200 ₴ charge came as a surprise and pushed people to leave.',
        },
        {
          title: 'Every doubt became a call',
          text: 'Activation status, plan conditions and billing rules weren’t explained in the app, so questions went straight to the contact centre.',
        },
      ],
      question:
        'How might I make a conditional free plan feel as simple as it sounds, from the first tap to the first renewal?',
    },
    research: {
      title: 'Understanding the drop-off before redesigning the flow.',
      text: 'The funnel showed where users dropped off. Research had to explain why: from awareness and trust to value clarity and activation barriers.',
      methods: ['Product analytics', 'Funnel analysis', 'User interviews'],
      goals: [
        {
          tag: 'Value clarity',
          title: 'Understand value perception',
          text: 'Do users understand what they get from Yezzz! after activation?',
        },
        {
          tag: 'Drop-off reasons',
          title: 'Find activation barriers',
          text: 'Why do users stop after clicking the Yezzz! banner?',
        },
        {
          tag: 'Trust & clarity',
          title: 'Explore brand perception',
          text: 'How much do users trust Yezzz!, and is the offer clear enough?',
        },
        {
          tag: 'Discoverability',
          title: 'Evaluate entry point visibility',
          text: 'Do users notice Yezzz! inside Silpo, and what motivates them to learn more?',
        },
      ],
      journey: ['Notice', 'Understand', 'Trust', 'Activate'],
    },
    hypotheses: {
      title:
        'Based on analytics and user interviews, I generated 15 hypotheses.',
      text: 'Each one was scored by Impact, Confidence and Ease to surface the ideas with the highest potential effect on activation. The top five became the core of the redesign.',
      criteria: [
        { name: 'Impact', text: 'Effect on activation & retention' },
        { name: 'Confidence', text: 'Evidence from analytics & interviews' },
        { name: 'Ease', text: 'Implementation effort & complexity' },
      ],
      items: [
        {
          title: 'Increase trust in the product',
          impact: 7,
          confidence: 7,
          ease: 8,
        },
        {
          title: 'Add an FAQ section in the app',
          impact: 7,
          confidence: 7,
          ease: 8,
        },
        {
          title: 'Clarify offer conditions before activation',
          impact: 9,
          confidence: 8,
          ease: 5,
        },
        {
          title: 'Notify users about a new Yezzz! offer after a purchase',
          impact: 6,
          confidence: 6,
          ease: 9,
        },
        {
          title: 'Show progress toward the monthly goal',
          impact: 5,
          confidence: 7,
          ease: 9,
        },
        {
          title: 'Personalise based on in-app behaviour',
          impact: 9,
          confidence: 5,
          ease: 5,
        },
        {
          title: 'Improve partner (Silpo) trust communication',
          impact: 8,
          confidence: 5,
          ease: 6,
        },
        {
          title: 'Communicate the number verification step clearly',
          impact: 8,
          confidence: 5,
          ease: 5,
        },
        {
          title: 'Activate a referral programme',
          impact: 7,
          confidence: 5,
          ease: 5,
        },
        {
          title: 'Launch personalised push notifications',
          impact: 6,
          confidence: 5,
          ease: 6,
        },
        {
          title: 'Simplify onboarding with a single entry point',
          impact: 6,
          confidence: 5,
          ease: 5,
        },
        {
          title: 'Add social proof on the offer screen',
          impact: 5,
          confidence: 6,
          ease: 5,
        },
        {
          title: 'Enable a guest preview before registration',
          impact: 5,
          confidence: 5,
          ease: 5,
        },
        {
          title: 'Highlight the cashback benefit in the banner',
          impact: 4,
          confidence: 6,
          ease: 6,
        },
        {
          title: 'Add a gamification layer to the activation flow',
          impact: 5,
          confidence: 4,
          ease: 4,
        },
      ],
      selected: 5,
      takeaway:
        'The highest-scored hypotheses focused on trust, offer clarity and better guidance through the activation flow.',
    },
    solution: {
      title: 'Seven decisions across the whole journey.',
      text: 'Instead of polishing screens one by one, I designed the journey around the question a user has at each step, and answered only that question.',
      directions: [
        {
          title: 'Personalised entry points based on behaviour',
          summary:
            'Users often saw Yezzz! banners as generic advertising. To make the offer relevant, entry points and promo messages were redesigned around what people do inside the Silpo app.',
          hypothesis:
            'Users ignored the Yezzz! offer because it looked like a general promo and didn’t reflect their needs or behaviour in the app.',
          insight: {
            text: 'Personalised offers feel more relevant because they usually include useful bonuses and better deals.',
            source: 'Yulia, interview participant',
          },
          decision: [
            'Updated the Yezzz! banners with stronger visual and text triggers, so the offer is easier to notice.',
            'Connected entry points to the user’s shopping behaviour.',
          ],
          tags: [
            'Personalised offer',
            'Behaviour-based trigger',
            'Higher visibility',
          ],
          screens: [screens.homeEntry],
        },
        {
          title: 'Onboarding before activation',
          summary:
            'First-time visitors landed straight on a plan card. A short onboarding now explains what Yezzz! is before asking for anything.',
          hypothesis:
            'Users who open the Yezzz! section in the Silpo app for the first time don’t clearly understand what the service is or what benefits it offers.',
          insight: {
            text: 'I didn’t feel like digging deeper to figure out the benefits. If there were some nice perks or extra cashback, I might consider it.',
            source: 'Roman, interview participant',
          },
          decision: [
            'Introduced an onboarding flow that explains the service and highlights its key benefits.',
          ],
          tags: ['Clear benefits', 'Easy activation'],
          screens: [screens.intro],
        },
        {
          title: 'Explain the deal before asking for anything',
          summary:
            'People didn’t know how much to spend to get the plan for free: the conditions only appeared after the first purchase. The offer page now states the rule in plain language, up front.',
          hypothesis:
            'Users don’t understand what amount needs to be spent to receive free service, and the conditions only become visible after the first purchase.',
          insight: {
            text: 'At the beginning, it was unclear what to do and how to activate the number, but I eventually figured it out.',
            source: 'Tetiana, interview participant',
          },
          decision: [
            'The page leads with three numbers: 750 min, 15 GB, unlimited socials.',
            '“Free for purchases” and “standard 200 ₴” sit side by side, so the rule is visible before the first tap.',
            'Four ways to connect are written in the first person, each leading to its shortest flow.',
          ],
          tags: ['Transparent terms', 'Simple navigation'],
          screens: [screens.offer, screens.connect],
        },
        {
          title: 'Keep your number',
          summary:
            'Users weren’t aware they could keep their number. Number retention became a prominent benefit, with a step-by-step guide.',
          hypothesis:
            'Users aren’t aware they can transfer their phone number and don’t see it as an option when they first explore the product.',
          insight: {
            text: 'The first is keeping my number. This is very important to me.',
            source: 'Yulia, interview participant',
          },
          decision: [
            'Highlighted number retention as a key benefit early on.',
            'Added a simple step-by-step transfer guide.',
            'Made it clear that a Yezzz! starter pack has to be bought separately.',
          ],
          tags: ['Number porting', 'Step-by-step guide'],
          screens: [screens.porting],
        },
        {
          title: 'A clear account after activation',
          summary:
            'After connecting, people didn’t know where their plan lived or what they could do next. The account now opens with the plan status and everything that matters on one screen.',
          hypothesis:
            'Users don’t always understand where to find their plan details in the app, or what actions become available after activation.',
          insight: {
            text: 'My colleague said it’s actually a pretty small amount to spend to get a free plan nowadays, but what puts her off is having to spend time managing multiple accounts.',
            source: 'Tetiana, interview participant',
          },
          decision: [
            'Plan status, number and validity date sit at the top of the account.',
            'Balance, minutes and data follow, with plan details one tap away.',
          ],
          tags: ['Transparent plan details', 'Easy account management'],
          screens: [screens.accountActive, screens.tariffDetails],
        },
        {
          title: 'Make the way to “free” visible',
          summary:
            'Not knowing where you stand on the 2,000 ₴ goal was the main reason to leave after the first month. The account now shows progress and the billing cycle.',
          hypothesis:
            'Users don’t clearly understand how many minutes and GB they have left, which period the data refers to, and when the current billing cycle ends.',
          insight: {
            text: 'Did I meet this main requirement in February, and will I still have the package for free in March? How am I supposed to understand that?',
            source: 'Yulia, interview participant',
          },
          decision: [
            'A goal tracker shows how much is spent, how much is left, and the deadline.',
            'Usage rings show remaining minutes and data at a glance, with the billing cycle dates.',
          ],
          tags: ['Goal tracker', 'Usage at a glance'],
          screens: [screens.account, screens.usage],
        },
        {
          title: 'Answer the question before it becomes a call',
          summary:
            'Support topics kept repeating: how purchases count, what if I miss the goal, how long porting takes. The answers now live in the app.',
          hypothesis:
            'Users have many questions about the package terms and can’t quickly find answers on their own in the app.',
          insight: {
            text: 'I didn’t really read the terms, I just checked whether the offer was a good deal. But when it came to renewing the package, it became unclear how it actually works.',
            source: 'Sergiy, interview participant',
          },
          decision: [
            'A self-service help hub built from those exact questions, reachable from every screen.',
            'The contact centre is the last step, not the first.',
          ],
          tags: ['Self-service', 'Fewer support calls'],
          screens: [screens.help, screens.faq],
        },
      ],
    },
    flow: {
      title: 'From drop-off to activation, across the full journey.',
      text: 'The redesigned path from the first look at the offer to an active plan. Each step answers one question and leads to the shortest next one.',
      steps: [
        { label: 'See the offer', screen: screens.offer },
        { label: 'Choose a path', screen: screens.connect },
        { label: 'Enter the number', screen: screens.number },
        { label: 'Know what’s next', screen: screens.requestSent },
        { label: 'Track the goal', screen: screens.account },
      ],
    },
    impact: {
      title: 'Shipped, and built to be measured.',
      text: 'The redesigned experience shipped in the Yezzz! section of the Silpo app. Before launch I agreed four signals with the product team that show whether the journey works.',
      baseline: {
        value: '2.35%',
        label: 'Activation before the redesign',
        note: '3,251 of 138,482 users who opened the Yezzz! screen, over 30 days.',
      },
      expected: {
        value: '+6–7%',
        label: 'Expected funnel conversion',
        note: 'From a clearer value proposition and transparent conditions before activation, the top-scored hypotheses.',
      },
      metrics: [
        {
          name: 'Activation',
          text: 'Users who complete activation',
          baseline: '2.35% before',
        },
        {
          name: 'First-month goal',
          text: 'Users who hit the 2,000 ₴ goal in month one',
        },
        {
          name: 'Retention',
          text: 'Users who stay after the first billing cycle',
        },
        {
          name: 'Support load',
          text: 'Contacts about activation and billing',
        },
      ],
    },
    learnings: {
      title: 'Small words, big drop-offs.',
      items: [
        'A conditional offer needs a progress bar, not a paragraph.',
        'Name options after people’s situations, not after internal products.',
        'Every repeated support question is a missing sentence in the UI.',
      ],
    },
  },
  {
    slug: 'yo-esim',
    next: {
      title: 'Mobile App for Managing Advertisement',
      slug: 'ad-management-app',
    },
    hero: {
      kicker: 'Case study · YO eSIM by Global YO',
      title: 'An eSIM a traveller can buy, install and manage without help.',
      lead: 'Global YO is an app for staying connected abroad. A team of four designers built its eSIM feature: choosing a plan, installing it on iOS or Android, and tracking data on the road. The same experience runs on iOS, Android and web.',
      facts: [
        { label: 'Role', value: 'Product Designer, team of four' },
        { label: 'Scope', value: 'Store, checkout, My eSIMs, install guides' },
        { label: 'Platform', value: 'iOS · Android · Web' },
        { label: 'Business domain', value: 'eSIM, travel' },
      ],
      screens: [esimScreens.store, esimScreens.localPlans, esimScreens.plan],
    },
    overview: {
      problem:
        'An eSIM has no card to swap and no counter to ask at. A traveller has to pick a destination, buy a plan, check the phone supports it, install it and activate it, and most eSIMs can only be activated once.',
      solution:
        'I built one flow for three jobs: a store that starts with “Where to?”, a My eSIMs space that shows every plan’s state and data, and install guides for iOS and Android with a direct, a QR code and a manual path.',
      impact:
        'The result is 60+ screens for iOS, Android and web. The case has no launch numbers, so I list what the work delivered and the four metrics to watch first.',
    },
    role: {
      title: 'Product Designer, team of four',
      text: 'Four designers worked on the feature in Figma. This case follows the whole experience as one flow, from the first search in the store to the last step of the install guide.',
      scope: [
        'Store: local, regional and global plans',
        'Plan cards and checkout',
        'Device check and payment',
        'My eSIMs: list, usage and plan states',
        'Install guides for iOS and Android',
        'Direct, QR code and manual paths',
        'One experience for iOS, Android and web',
      ],
    },
    problem: {
      title: 'Buying an eSIM is easy to get wrong and hard to undo.',
      text: 'The whole path happens in the app: pick a destination, buy a plan, install it on the phone, activate it. There is nobody to ask, and four things along the way can go wrong.',
      frictionTitle: 'Four points where a traveller can get stuck',
      friction: [
        {
          title: 'Too many places to look',
          text: 'Plans are sold per country, per region and worldwide. A long list of countries makes people scroll before they can compare a single plan.',
        },
        {
          title: 'A plan the phone can’t use',
          text: 'The phone has to support eSIM, be unlocked and not be jailbroken. Finding that out after paying is too late.',
        },
        {
          title: 'Steps that change by phone',
          text: 'iOS offers a direct link, a QR code and manual entry. Android menus differ by model. Without a guide, people get lost in Settings.',
        },
        {
          title: 'One chance to activate',
          text: 'Most eSIMs can only be activated once. Remove one from the phone and it is gone, so every plan has to show its state.',
        },
      ],
      question:
        'How might I take a traveller from “Where to?” to working mobile data, and keep them oriented while they use it abroad?',
    },
    hypotheses: {
      title: 'Four hypotheses behind the design.',
      text: 'The case has no interview data, so these are design hypotheses: assumptions to test after launch, not findings. Each one became a part of the product.',
      statements: [
        {
          tag: 'Store',
          title: 'Start with the place',
          text: 'Travellers think in places, not plans. A store that starts with “Where to?” gets them to the right plan faster.',
        },
        {
          tag: 'Trust',
          title: 'Check the phone up front',
          text: 'If the app says what an eSIM needs and asks for a confirmation early, fewer people buy a plan they can’t use.',
        },
        {
          tag: 'Install',
          title: 'Guide every step on the phone',
          text: 'A short guide for each platform and each path lets people finish the install without leaving the app to search for help.',
        },
        {
          tag: 'Manage',
          title: 'Show the state of every plan',
          text: 'Active, pending and expired plans, with the data left, tell a traveller what to do next: top up, wait or buy again.',
        },
      ],
      takeaway:
        'The four hypotheses became the store, the device check, the install guides and My eSIMs.',
    },
    solution: {
      title: 'Seven decisions from the store to the settings screen.',
      text: 'I designed the flow around the question a traveller has at each step, and answered only that question.',
      directions: [
        {
          title: 'Start with “Where to?”',
          summary:
            'The store opens with one question and a search field. A Local, Regional and Global switch sets the size of the trip before any plan appears.',
          hypothesis:
            'Travellers think in places, not in plans. If the store starts with a destination, they find the right plan faster.',
          decision: [
            'A search field and a Local, Regional, Global switch sit at the top of the eSIM Shop.',
            'Countries come with flags, and regions say how many countries they cover.',
            'A sheet of available countries lists the supported networks for each one.',
          ],
          tags: ['Search first', 'Local · Regional · Global'],
          screens: [esimScreens.store, esimScreens.regional],
        },
        {
          title: 'Plans you can compare at a glance',
          summary:
            'A country opens its plans as cards with the same facts in the same order. Checkout repeats them in a short review.',
          hypothesis:
            'A traveller compares plans by data, price and days. If every card shows them the same way, choosing is a glance, not a read.',
          decision: [
            'Each card leads with the data amount and the price, then validity and type.',
            'A “Best value” tag marks the plan to start from, and the full price stays next to the discount.',
            'Check Out repeats the plan, shows the discount and the order summary, then asks for one tap.',
          ],
          tags: ['Best value', 'Same facts, same order', 'Short checkout'],
          screens: [esimScreens.localPlans, esimScreens.checkout],
        },
        {
          title: 'Check the phone, then pay',
          summary:
            'An info screen lists what the phone needs for an eSIM and asks the traveller to confirm it. Payment is a single screen.',
          hypothesis:
            'A plan is wasted if the phone can’t take an eSIM. If the app says what is needed and asks for a confirmation early, fewer people buy a plan they can’t use.',
          decision: [
            'Three points in plain words: the phone supports eSIM, it is unlocked and not jailbroken, and validity starts when you connect.',
            'A checkbox the traveller ticks to confirm they checked the compatibility.',
            'Payment lists saved cards, Apple Pay and a new card, with one Buy Now button.',
          ],
          tags: ['Compatibility check', 'Saved cards', 'Apple Pay'],
          screens: [esimScreens.requirements, esimScreens.payment],
        },
        {
          title: 'One place for every plan',
          summary:
            'My eSIMs lists every plan with its data and networks. A plan opens into its usage, its packages and the install guide.',
          hypothesis:
            'After buying, a traveller wants to know one thing: how much data is left. If usage is the first thing a plan shows, they don’t have to look for it.',
          decision: [
            'Active and Expired tabs split the list, and each card has Details and Top-Up.',
            'A ring shows the data left out of the total, with Top-Up right under it.',
            'My packages lists each package with its expiry, data and validity.',
            'The installation instruction, FAQ and Help Center stay one tap away.',
          ],
          tags: ['Usage ring', 'Top-Up in reach', 'Active · Expired'],
          screens: [esimScreens.myEsims, esimScreens.plan],
        },
        {
          title: 'Every state has a next step',
          summary:
            'A plan can be waiting, active or expired. Each state says what is happening and offers the one action that makes sense.',
          hypothesis:
            'Most eSIMs can only be activated once, so a traveller has to see the state of a plan to know what to do with it.',
          decision: [
            'A plan bought for later says it will activate automatically when the traveller connects to the destination network.',
            'An expired plan shows 0 GB, the expiry dates and a Buy Again button.',
            'A banner at the top of every plan repeats the one-time activation rule.',
          ],
          tags: ['Pending', 'Expired', 'Buy again'],
          screens: [esimScreens.futurePlan, esimScreens.expired],
        },
        {
          title: 'Install on iPhone in three ways',
          summary:
            'Installation is a short guide with a switch at the top: Direct, QR Code or Manual. Each path has its own steps and its own hints.',
          hypothesis:
            'Installing is the step where people give up. If the app guides each step on the phone, they can finish without searching for help.',
          decision: [
            'Direct starts the installation from one link and one Start button.',
            'QR Code shows the code to scan or save, and says what to press next.',
            'Manual lists the activation details to copy into Settings.',
            'Later steps explain which line to use for data and how to manage the eSIM after activation.',
          ],
          tags: ['Direct · QR · Manual', 'Step by step'],
          screens: [esimScreens.iosDirect, esimScreens.qr],
        },
        {
          title: 'An Android guide that admits phones differ',
          summary:
            'Android menus change by model. The guide says so up front, then walks through Settings one step at a time.',
          hypothesis:
            'On Android the way through Settings depends on the phone. If the guide is honest about that and shows each menu, travellers still find the way.',
          decision: [
            'The first screen warns that steps may differ by model, and names the Samsung Galaxy series the guide follows.',
            'It asks for a good connection before the first step.',
            'Each step quotes the real menu names, from Connections to SIM manager and Add mobile plan.',
          ],
          tags: ['Honest about differences', 'Real menu names'],
          screens: [esimScreens.androidIntro, esimScreens.androidSettings],
        },
      ],
    },
    flow: {
      title: 'From “Where to?” to working data.',
      text: 'The path of a first purchase on iPhone: pick a place, choose a plan, pay, install, then track data. Android follows the same steps with its own guide.',
      steps: [
        { label: 'Pick a place', screen: esimScreens.store },
        { label: 'Choose a plan', screen: esimScreens.localPlans },
        { label: 'Pay', screen: esimScreens.checkout },
        { label: 'Install', screen: esimScreens.iosDirect },
        { label: 'Track data', screen: esimScreens.plan },
      ],
    },
    impact: {
      title: 'A complete experience, ready to be measured.',
      text: 'The case ends at design, so it has no launch numbers. Here is what the work delivered and what to measure first.',
      deliverables: [
        {
          value: '60+',
          label: 'Screens designed',
          note: 'The store, checkout, My eSIMs and the install guides.',
        },
        {
          value: '3',
          label: 'Platforms',
          note: 'iOS, Android and web share one eSIM experience.',
        },
        {
          value: '3',
          label: 'Install paths',
          note: 'Direct link, QR code and manual entry, each with its own guide.',
        },
      ],
      metricsLabel: 'What to measure first',
      metrics: [
        {
          name: 'Plan to install',
          text: 'Share of bought plans that end up installed.',
        },
        {
          name: 'Install success',
          text: 'Travellers who finish an install path without help.',
        },
        {
          name: 'Time to first data',
          text: 'How long it takes from payment to the first connection.',
        },
        {
          name: 'Support contacts',
          text: 'Questions about installing or activating a plan.',
        },
      ],
    },
    learnings: {
      title: 'Where an eSIM trip goes wrong.',
      items: [
        'Say what the phone needs before you ask for money.',
        'An install guide is part of the product, not a help article.',
        'When an action can’t be undone, show the state of the thing afterwards.',
      ],
    },
  },
  {
    slug: 'ad-management-app',
    next: { title: 'Yezzz! Retail Telecom Brand', slug: 'yezzz' },
    hero: {
      kicker: 'Case study · Mobile advertisement app',
      title: 'One app to run advertising on TV screens, from a phone.',
      lead: 'A mobile app for managing ad campaigns that play on TV screens in shopping centres and restaurants. I took it from competitor research and interviews to a UI kit and a working prototype, with 30+ screens.',
      facts: [
        { label: 'Role', value: 'Product Designer, solo' },
        { label: 'Scope', value: 'Research, UX, UI kit, prototype' },
        { label: 'Platform', value: 'Mobile app · iOS' },
        { label: 'Business domain', value: 'Advertising' },
      ],
      screens: [adScreens.home, adScreens.campaigns, adScreens.createCampaign],
    },
    overview: {
      problem:
        'Ad campaigns shown on TV screens in shopping centres and restaurants needed a mobile app. It had to hold four connected things, campaigns, media, channels and players, without becoming a maze of menus.',
      solution:
        'Competitor analysis and in-depth interviews gave four hypotheses. They became four rules: a bottom tab bar, actions in bottom sheets, forms with no exit and a payment history. I applied them to every entity.',
      impact:
        'The result is 30+ screens, a UI kit with a global style guide and a working prototype. The case has no launch numbers, so I list the four metrics I would watch first.',
    },
    role: {
      title: 'Product Designer, solo',
      text: 'I did the whole design process alone: compared competitors, ran in-depth interviews, turned the findings into hypotheses, mapped the user flow, drew wireframes, then built the visual design and the UI kit in Figma.',
      scope: [
        'Competitor analysis, UX and UI',
        'In-depth interviews',
        'Hypotheses and design rules',
        'User flow and wireframes',
        'Visual design, 30+ screens',
        'UI kit and global style guide',
        'Working prototype',
      ],
    },
    problem: {
      title: 'Four connected things had to fit in one hand.',
      text: 'The business asked for a mobile app to manage advertising campaigns broadcast on TV screens in shopping centres and restaurants. A campaign runs on a channel, a channel groups media and players, and a player is a screen somewhere. A manager has to see and change all of it from a phone.',
      stats: [
        {
          value: '4',
          label: 'Entities to manage',
          note: 'Campaigns, media, channels and players, each with its own list, details and actions.',
        },
        {
          value: '2',
          label: 'Venue types with screens',
          note: 'Shopping centres and restaurants are where the ads are shown.',
        },
        {
          value: '30+',
          label: 'Screens designed',
          note: 'From the first launch to reports and payment history.',
        },
      ],
      frictionTitle:
        'Four design challenges followed from that, and each one became a hypothesis',
      friction: [
        {
          title: 'Many entities, one small screen',
          text: 'Campaigns, media, channels and players all need lists, details and edits. Without a clear structure the app turns into a maze of menus.',
        },
        {
          title: 'Actions that are hard to reach',
          text: 'Start, stop, edit, delete and share apply to almost everything. They have to be reachable with the thumb of the dominant hand.',
        },
        {
          title: 'Forms that are easy to lose',
          text: 'A campaign needs dates, a client, a channel, player tags and a price. One stray tap on the tab bar and the form is gone.',
        },
        {
          title: 'Spend without a trail',
          text: 'Campaigns are priced per channel or per player. Managers need to see what they paid for, and when.',
        },
      ],
      question:
        'How might I let a manager run a whole advertising network with one hand, and still see what plays where and what it costs?',
    },
    research: {
      title: 'Learn from competitors and users before drawing screens.',
      text: 'I started with apps people already use for tasks, social content and telecom, including Trello, monday.com, Todoist, Instagram and Vodafone. Then I tested my assumptions in in-depth interviews.',
      methods: ['Competitor analysis', 'In-depth interviews', 'Hypotheses'],
      goals: [
        {
          tag: 'Competitors · UX',
          title: 'Find patterns worth keeping',
          text: 'Noted both successful UX patterns and weaker ones that could be improved for a more comfortable user flow.',
        },
        {
          tag: 'Competitors · UI',
          title: 'See what good apps look like',
          text: 'Apps with good reviews and strong ratings tend to have a clean design with well-placed accents.',
        },
        {
          tag: 'Interviews',
          title: 'Find what people lack',
          text: 'In-depth interviews showed what people miss in apps like this and what deserves attention.',
        },
        {
          tag: 'Hypotheses',
          title: 'Test assumptions early',
          text: 'Hypotheses were drawn up from the competitor analysis and tested in the interviews.',
        },
      ],
      journeyLabel: 'The design process',
      journey: [
        'Competitors',
        'Interviews',
        'Hypotheses',
        'Wireframes',
        'UI kit',
      ],
    },
    hypotheses: {
      title: 'Four hypotheses, tested in interviews.',
      text: 'They came from the competitor analysis and were checked with users. Each one became a rule for the design.',
      statements: [
        {
          tag: 'Navigation',
          title: 'Move around from the bottom',
          text: 'It is most convenient to move between key functions with a menu at the bottom of the screen.',
        },
        {
          tag: 'Actions',
          title: 'Act from the bottom',
          text: 'It is most convenient to reach actions on every entity at the bottom of the screen, with the thumb of the dominant hand.',
        },
        {
          tag: 'Forms',
          title: 'Close the exit on forms',
          text: 'On screens for creating and editing, hide the bottom menu, so nobody leaves the form by accident.',
        },
        {
          tag: 'Payments',
          title: 'Keep a payment history',
          text: 'Users need a payment history in the app to keep track of their spending.',
        },
      ],
      takeaway:
        'The interviews showed what people miss in apps like this. The four answers set the rules for structure, actions, forms and money.',
    },
    solution: {
      title: 'Five decisions, one pattern.',
      text: 'Each hypothesis became a design rule. I applied the rules to all four entities, so a manager learns the app once.',
      directions: [
        {
          title: 'Five tabs for five jobs',
          summary:
            'The main functions live in a tab bar at the bottom. Home gives a quick look at everything, and the rest sits one tap away.',
          hypothesis:
            'It is most convenient for the user to navigate the key functions of the app with a menu at the bottom of the screen.',
          decision: [
            'A tab bar with Home, Campaign, Media, Channels and Players on every list screen.',
            'Home shows the latest campaigns with All, Active and Draft filters, and player status tiles.',
            'Profile, Report, Payment History and Settings open from a menu sheet, so they stay out of the way.',
          ],
          tags: ['Bottom navigation', 'Home as a dashboard'],
          screens: [adScreens.home, adScreens.menu],
        },
        {
          title: 'Actions where the thumb already is',
          summary:
            'Every card has a three-dot button. It opens a bottom sheet with the actions that make sense for that entity.',
          hypothesis:
            'It is most convenient to have access to actions on all entities of the app at the bottom of the screen, to control them with the finger of the dominant hand.',
          decision: [
            'Campaigns open Start, Stop, Edit and Delete.',
            'Channels open Change Schedule, Assign New Player, Edit and Delete.',
            'Players open a share sheet. The pattern is the same for all of them.',
          ],
          tags: ['Bottom sheets', 'One-handed use'],
          screens: [adScreens.campaignActions, adScreens.channelActions],
        },
        {
          title: 'Forms with one way out',
          summary:
            'Creating a campaign takes a lot of input. While you do it, nothing else on the screen can take you away.',
          hypothesis:
            'On all screens with forms for creating and editing entities, it is better to disable the bottom navigation menu, so the user does not leave the form by mistake.',
          decision: [
            'The tab bar is hidden. The only controls are Back and the form.',
            'The date range opens in a bottom sheet with the range highlighted and the number of days.',
            'A running total sits above the Pay button, so the price is clear before you commit.',
          ],
          tags: ['No tab bar on forms', 'Date range', 'Running total'],
          screens: [adScreens.createCampaign, adScreens.chooseDate],
        },
        {
          title: 'Know what you spend',
          summary:
            'Money gets its own place. Payment History lists what was paid, and paying itself is a short form.',
          hypothesis:
            'It is very important for the user to have a payment history in the app, so they can control their spending.',
          decision: [
            'Payment History lists campaigns with client, dates and price per channel, with search.',
            'Paying takes one screen: card or PayPal, details, and the amount on the button.',
            'Report lists campaigns by state: scheduled, active and expired.',
          ],
          tags: ['Payment history', 'Spend control'],
          screens: [adScreens.paymentHistory, adScreens.payment],
        },
        {
          title: 'The same pattern for media, channels and players',
          summary:
            'Media, channels and players follow the same logic as campaigns: a list, a card, a bottom sheet. Each one adds only what its content needs.',
          hypothesis:
            'If every entity follows one pattern, a manager has to learn the app only once.',
          decision: [
            'Media switches between a grid and a list, and has search and sort.',
            'Channels show a featured playlist first, then the rest with players and media items.',
            'Players switch between a map and details, with priority filters for online, active and offline.',
          ],
          tags: ['Consistent patterns', 'Map view', 'Grid and list'],
          screens: [adScreens.mediaGrid, adScreens.playersMap],
        },
      ],
    },
    flow: {
      title: 'From the first launch to a running campaign.',
      text: 'The path a new user walks: welcome, sign in, home, the campaign list, then the form that creates one. Returning users with biometric login skip straight to home.',
      steps: [
        { label: 'Welcome', screen: adScreens.onboarding },
        { label: 'Sign in', screen: adScreens.login },
        { label: 'See everything', screen: adScreens.home },
        { label: 'Open campaigns', screen: adScreens.campaigns },
        { label: 'Create one', screen: adScreens.createCampaign },
      ],
    },
    impact: {
      title: 'A complete design, ready to build on.',
      text: 'The case ends at design, so it has no launch numbers. Here is what the work delivered and what I would measure first.',
      deliverables: [
        {
          value: '30+',
          label: 'Screens designed',
          note: 'From the welcome screen to reports and payment history.',
        },
        {
          value: '4',
          label: 'Hypotheses tested',
          note: 'Each one became a rule that all four entities follow.',
        },
        {
          value: '1',
          label: 'UI kit and working prototype',
          note: 'Rubik and Poppins, one primary blue, components and a global style guide.',
        },
      ],
      metricsLabel: 'What I would measure first',
      metrics: [
        {
          name: 'Time to launch',
          text: 'How long it takes to create and start a campaign.',
        },
        {
          name: 'Form completion',
          text: 'Share of started campaign forms that are saved.',
        },
        {
          name: 'Task success',
          text: 'Managers who start, stop or edit a campaign without help.',
        },
        {
          name: 'Payment history use',
          text: 'How often managers open it around a payment.',
        },
      ],
    },
    learnings: {
      title: 'Small rules, repeated everywhere.',
      items: [
        'One pattern repeated across every entity teaches an app faster than onboarding.',
        'A form should have one way out, and it should be obvious.',
        'People control spending when they can see it, so money needs a trail.',
      ],
    },
  },
];
