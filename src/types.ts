export interface ProjectItem {
  id: string;
  name: string;
  category: 'hackathon' | 'startup' | 'featured' | 'research';
  tagline: string;
  role?: string;
  year?: string;
  award?: string;
  description: string;
  highlights: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; url: string; isExternal?: boolean }[];
}

export interface SystemPipeline {
  name: string;
  label: string;
  flow: string[];
  description?: string;
}

export interface SystemHighlight {
  title?: string;
  text: string;
}

export interface SystemOverviewData {
  tagPill: string;
  badgePill: string;
  title: string;
  subtitle: string;
  bodyText: string[];
  metrics: Array<{ label: string; value: string }>;
  sectionLabel: string;
  pipelines?: SystemPipeline[];
  highlights: SystemHighlight[];
  stackTags?: string[];
  stackNote?: string;
}

export interface SystemStoryData {
  problemLabel?: string;
  problemText?: string;
  briefLabel?: string;
  briefText?: string;
  roleTitle?: string;
  roleDescription?: string;
  stackTags?: string[];
  stackNote?: string;
  editorialQuoteLabel?: string;
  editorialQuoteText?: string;
  reflectionLabel?: string;
  reflectionText?: string;
}

export interface SkillItem {
  name: string;
  note?: string;
}

export interface SkillGroup {
  groupName: string;
  skills: SkillItem[];
}

export interface TechnicalArsenalData {
  tag: string;
  title: string;
  subtitle: string;
  body: string;
  groups: SkillGroup[];
  footerNote?: string;
  roleTagLine?: string;
}

export interface CreativePracticeData {
  tag: string;
  title: string;
  subtitle: string;
  body?: string;
  stats?: ChapterStat[];
  sectionLabel?: string;
  bullets?: string[];
  roleTagLine?: string;
  craft?: {
    label: string;
    narrative: string;
    bullets: string[];
  };
  movement?: {
    label: string;
    activities: string[];
    quote: string;
  };
}

export interface ChapterStat {
  value: string;
  label: string;
}

export interface HackChapterData {
  tag: string;
  badge: {
    label: string;
    type?: 'green' | 'silver' | 'steel' | 'blue' | string;
  };
  title: string;
  subtitle: string;
  body: string;
  stats?: ChapterStat[];
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  sectionLabel?: string;
  highlights: string[];
  stackTags?: string[];
  roleTagLine: string;
  liveLink?: {
    url: string;
    label: string;
    displayPrompt?: string;
    style?: 'pill' | 'card';
  };
}

export interface SystemChapterData {
  tag: string;
  badge: {
    label: string;
    type?: 'steel' | 'blue' | 'green' | 'silver' | string;
  };
  title: string;
  subtitle: string;
  body: string;
  stats?: ChapterStat[];
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  sectionLabel?: string;
  highlights: string[];
  stackTags?: string[];
  roleTagLine: string;
  liveLink?: {
    url: string;
    label: string;
    displayPrompt?: string;
    style?: 'pill' | 'card';
  };
}

export interface ScrapbookEntry {
  title: string;
  badge?: string;
  bullets: string[];
  connectionNote?: string;
  isHighlighted?: boolean;
}

export interface OriginsChapterData {
  tag: string;
  badge?: {
    label: string;
  };
  title: string;
  subtitle: string;
  body: string;
  stats?: ChapterStat[];
  sectionLabel?: string;
  highlights: string[];
  editorialNote?: string;
  roleTagLine: string;
  // Backward compatibility optional fields
  entries?: ScrapbookEntry[];
  quote?: string;
  closingNote?: string;
}

export interface VentureMetric {
  value: string;
  label: string;
  sublabel?: string;
}

export interface VentureChapterData {
  tag: string;
  badge: {
    label: string;
    type?: 'president' | 'paused' | 'live' | 'instructor' | string;
  };
  title: string;
  subtitle: string;
  body: string;
  stats?: ChapterStat[];
  metrics?: VentureMetric[];
  sectionLabel?: string;
  highlights: string[];
  communityItems?: string[];
  roleTagLine: string;
  liveLink?: {
    url: string;
    label: string;
    displayPrompt?: string;
    style?: 'pill' | 'card';
  };
  editorialNote?: string;
}

export interface CommunityClub {
  title: string;
  subtitle?: string;
  role: string;
  focus: string;
}

export interface CommunitySectionData {
  label: string;
  subtitle: string;
  clubs: CommunityClub[];
}

export interface AnalysisStatCard {
  value: string;
  label: string;
}

export interface AnalysisChapterData {
  tag: string;
  badge: {
    label: string;
    isPrimaryAccent?: boolean;
  };
  title: string;
  subtitle: string;
  body: string;
  stats?: ChapterStat[];
  statCards?: AnalysisStatCard[];
  sectionLabel?: string;
  highlights: string[];
  roleTagLine: string;
  editorialNote?: string;
}

export interface SecurityContextCard {
  label: string;
  lines: string[];
}

export interface SecurityChapterData {
  tag: string;
  badge: {
    label: string;
    style?: string;
    type?: string;
  };
  title: string;
  subtitle: string;
  body: string | string[];
  stats?: ChapterStat[];
  sectionLabel?: string;
  highlights?: string[];
  contextCards?: SecurityContextCard[];
  knownSection?: {
    label: string;
    bullets: string[];
  };
  comingSoon?: {
    title: string;
    body: string;
    expected: string;
  };
  roleTagLine: string;
}

export interface BookPage {
  pageNumber: number;
  chapterTitle?: string;
  sectionName?: string;
  type:
    | 'toc'
    | 'intro'
    | 'project'
    | 'section-header'
    | 'story'
    | 'gallery'
    | 'skills'
    | 'contact'
    | 'system-overview'
    | 'system-story'
    | 'technical-arsenal'
    | 'creative-practice'
    | 'hack-chapter'
    | 'system-chapter'
    | 'origins-chapter'
    | 'origins-keepsake'
    | 'venture-chapter'
    | 'community-section'
    | 'analysis-chapter'
    | 'security-chapter';
  title: string;
  subtitle?: string;
  content?: string;
  quote?: string;
  dateOrPeriod?: string;
  projectData?: ProjectItem;
  systemOverview?: SystemOverviewData;
  systemStory?: SystemStoryData;
  technicalArsenal?: TechnicalArsenalData;
  creativePractice?: CreativePracticeData;
  hackChapter?: HackChapterData;
  systemChapter?: SystemChapterData;
  originsChapter?: OriginsChapterData;
  ventureChapter?: VentureChapterData;
  communitySection?: CommunitySectionData;
  analysisChapter?: AnalysisChapterData;
  securityChapter?: SecurityChapterData;
  items?: Array<{
    title: string;
    subtitle?: string;
    description: string;
    badge?: string;
    date?: string;
    tags?: string[];
  }>;
  photosOrNotes?: Array<{
    label: string;
    caption: string;
    iconName?: string;
  }>;
}

export interface TableOfContentsEntry {
  sectionTitle: string;
  pageNumber: number;
  badge?: string;
  description?: string;
  subItems?: Array<{
    title: string;
    pageNumber: number;
    badge?: string;
    description?: string;
  }>;
}

export interface Book {
  id: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  spineColor: string;
  spineTextColor: string;
  spineAccentColor: string;
  accentBorderColor: string;
  accentBandColor?: string;
  pattern: 'ribs' | 'diamond' | 'double-frame' | 'bars' | 'classic' | 'modern' | 'stitched';
  romanNumeral?: string;
  heightClass: string;
  widthClass: string;
  tiltAngle?: number; // degrees for desktop shelf realism
  isExternalLink?: boolean;
  externalUrl?: string;
  iconName?: string;
  tableOfContents: TableOfContentsEntry[];
  pages: BookPage[];
}
