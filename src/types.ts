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

export interface BookPage {
  pageNumber: number;
  chapterTitle?: string;
  sectionName?: string;
  type: 'toc' | 'intro' | 'project' | 'section-header' | 'story' | 'gallery' | 'skills' | 'contact';
  title: string;
  subtitle?: string;
  content?: string;
  quote?: string;
  dateOrPeriod?: string;
  projectData?: ProjectItem;
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
  subItems?: Array<{
    title: string;
    pageNumber: number;
    badge?: string;
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
