// Shared shapes for the site data. Components import these types, never the data.

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  /** Optional endpoint (Formspree or similar) the contact form posts to. */
  formEndpoint: string;
  linkedin: string;
  linkedinRecommendations: string;
  youtube: string;
  dou: string;
};

export type Tool = {
  name: string;
  /** simple-icons slug. Without one the tile shows a monogram. */
  icon?: string;
  /** A self-hosted glyph in public/icons/, for brands simple-icons lacks. */
  src?: string;
  /** Monogram text when there is no icon. Defaults to the first letter. */
  mono?: string;
};

export type ToolGroup = { title: string; note: string; tools: Tool[] };

export type CaseArtKind = 'onboarding' | 'dashboard' | 'booking';

export type Case = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  domains: { label: string; tags: string[] }[];
  tools: Tool[];
  /** One factual line shown at the bottom of the card. */
  outcome: { value: string; label: string };
  /** Behance project page with the full case study. */
  behance: string;
  /** Shown on the short case page only. Left out when a date isn't wanted. */
  published?: string;
  team: string;
  /** Behance cover. If it fails to load, the illustration below is shown. */
  cover: string;
  coverAlt: string;
  art: CaseArtKind;
};

export type ArticleArtKind = 'questions' | 'crowded' | 'hiring';

export type Article = {
  title: string;
  summary: string;
  meta: string;
  href: string;
  /** Article cover from public/articles/. If it fails to load, the illustration below is shown. */
  cover: string;
  coverAlt: string;
  art: ArticleArtKind;
};

export type Talk = {
  title: string;
  meta: string;
  href: string;
  /** YouTube video id. Used for the real thumbnail. */
  youtubeId?: string;
  duration: string;
};

export type Review = {
  quote: string;
  name: string;
  role: string;
  /** How they know Anastasiia, as LinkedIn states it. */
  relation: string;
  date: string;
  /** The full text is longer on LinkedIn; a link to it is shown. */
  truncated?: boolean;
};

export type ProcessStep = {
  /** One short line shown next to the character. */
  text: string;
  /** Rive state machine to play for this step (see `rive`). */
  machine: string;
  /** How long the step stays on screen, in milliseconds. */
  ms: number;
};

export type RiveConfig = {
  src: string;
  artboard: string;
  /** Idle loop, used until a clip is chosen. */
  idle: string;
  /** Toolkit: one looping clip per tool group, in the order of the groups. */
  toolkit: string[];
};

export type NavLink = { label: string; href: string };

// ---------------------------------------------------------------------------
// Case studies: the long product story behind a case card.

/** One exported app screen in public/cases/<slug>/. Width and height are the
 * file's pixels, so the browser reserves the space before it loads. */
export type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** A plain fact with a small label above it. */
export type Fact = { label: string; value: string };

/** A numbered point: a friction point, a research goal, a learning. */
export type NumberedPoint = { title: string; text: string; tag?: string };

/** A big figure with what it counts. */
export type Stat = { value: string; label: string; note?: string };

export type FunnelStep = { label: string; count: number; share: string };

export type IceHypothesis = {
  title: string;
  impact: number;
  confidence: number;
  ease: number;
};

export type Quote = { text: string; source: string };

/** One solution direction: why (hypothesis, insight), what (decision), and the screens. */
export type SolutionDirection = {
  title: string;
  summary: string;
  hypothesis: string;
  /** A user quote or research finding. Left out when there is none to cite. */
  insight?: Quote;
  decision: string[];
  tags: string[];
  screens: Screen[];
};

export type TrackedMetric = { name: string; text: string; baseline?: string };

export type CaseStudy = {
  /** The case card this study belongs to (Case.slug). */
  slug: string;
  next?: { title: string; slug: string };
  hero: {
    kicker: string;
    title: string;
    lead: string;
    facts: Fact[];
    screens: Screen[];
  };
  overview: { problem: string; solution: string; impact: string };
  role: { title: string; text: string; scope: string[] };
  problem: {
    title: string;
    text: string;
    /** The old screen, when there is one to compare with. */
    before?: Screen;
    /** The headline drop-off and the funnel behind it, when analytics exist. */
    dropOff?: Stat;
    funnel?: {
      title: string;
      period: string;
      steps: FunnelStep[];
      note: string;
    };
    /** Key numbers about the problem or the product's scope. */
    stats?: Stat[];
    frictionTitle: string;
    friction: NumberedPoint[];
    question: string;
  };
  /** Left out when the case has no research of its own to show. */
  research?: {
    title: string;
    text: string;
    methods: string[];
    goals: NumberedPoint[];
    /** Accessible name of the path below the goals. Defaults to the user journey. */
    journeyLabel?: string;
    journey: string[];
  };
  hypotheses: {
    title: string;
    text: string;
    takeaway: string;
    /** ICE prioritisation: criteria, scored backlog and how many went ahead. */
    criteria?: { name: string; text: string }[];
    items?: IceHypothesis[];
    /** How many of the best-scored hypotheses went into development. */
    selected?: number;
    /** Hypotheses tested in interviews, when there is no scored backlog. */
    statements?: NumberedPoint[];
  };
  solution: { title: string; text: string; directions: SolutionDirection[] };
  flow: {
    title: string;
    text: string;
    steps: { label: string; screen: Screen }[];
  };
  impact: {
    title: string;
    text: string;
    /** Measured before and the target, when there is a baseline. */
    baseline?: Stat;
    expected?: Stat;
    /** What the work delivered, when there are no launch numbers to show. */
    deliverables?: Stat[];
    /** Heading of the metrics list. */
    metricsLabel?: string;
    metrics: TrackedMetric[];
  };
  learnings: { title: string; items: string[] };
};
