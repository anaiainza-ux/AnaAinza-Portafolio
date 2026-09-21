export interface PaintingData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  backTitle: string;
  description: string;
  url: string;
  gradientBack: [string, string];
  frameFinish: 'dark-walnut' | 'light-wood' | 'vintage-gold';
  nailColor: string; // '#C9A84C' | '#888888'
  side: 'left' | 'right';
  desktopPosition: {
    top: string;
    left?: string;
    right?: string;
    rotation: number;
  };
  imageSrc: string;
  tagColor?: 'orange' | 'default';
}

export const HANGING_FRAMES_DATA: PaintingData[] = [
  // 1. LEFT WALL (top): Zayu.go
  {
    id: 'frame-zayu',
    title: 'Zayu.go',
    subtitle: 'APPATHON · 2ND PLACE',
    tag: 'HACKS · 2ND PLACE',
    backTitle: 'Zayu.go',
    description: 'Multi-modal transport app built for the World Cup.',
    url: 'https://zayugo.netlify.app/',
    gradientBack: ['#6096BA', '#C8EAD3'],
    frameFinish: 'dark-walnut',
    nailColor: '#C9A84C',
    side: 'left',
    desktopPosition: {
      top: '8vh',
      left: '2vw',
      rotation: -4,
    },
    imageSrc: '/images/zayugo-map.svg',
    tagColor: 'orange',
  },
  // 2. LEFT WALL (bottom): Maia
  {
    id: 'frame-maia',
    title: 'Maia',
    subtitle: 'OUTSIIDERS',
    tag: 'VENTURES · 2026',
    backTitle: 'Maia',
    description: 'Outsiiders: Evolve to Innovate congress, 19 speakers, built from zero.',
    url: 'https://outsiiders.netlify.app/',
    gradientBack: ['#E7B5D0', '#B6C8A9'],
    frameFinish: 'dark-walnut',
    nailColor: '#888888',
    side: 'left',
    desktopPosition: {
      top: '38vh',
      left: '5vw',
      rotation: 3,
    },
    imageSrc: '/images/dog-portrait.svg',
  },
  // 3. RIGHT WALL (top): Craft / Dolce Puro
  {
    id: 'frame-craft',
    title: 'Craft',
    subtitle: 'UPCYCLING & SEWING',
    tag: 'VENTURES · LIVE',
    backTitle: 'Dolce Puro',
    description: 'Protein tiramisus with a real digital loyalty card.',
    url: 'https://dolcepuro.netlify.app/?id=DP-ANAAINZA',
    gradientBack: ['#B6C8A9', '#C8EAD3'],
    frameFinish: 'light-wood',
    nailColor: '#888888',
    side: 'right',
    desktopPosition: {
      top: '6vh',
      right: '2vw',
      rotation: 4,
    },
    imageSrc: '/images/sewing-machine.svg',
  },
  // 4. RIGHT WALL (bottom): Ferris of Colors / Smart Parking TEC
  {
    id: 'frame-ferris',
    title: 'Ferris of Colors',
    subtitle: 'Tec Smart Parking',
    tag: 'SYSTEMS · IoT',
    backTitle: 'Smart Parking TEC',
    description: 'Real-time campus parking, sensor to screen.',
    url: 'https://tec-smart-parking.netlify.app/',
    gradientBack: ['#6096BA', '#B6C8A9'],
    frameFinish: 'vintage-gold',
    nailColor: '#C9A84C',
    side: 'right',
    desktopPosition: {
      top: '36vh',
      right: '4vw',
      rotation: -3,
    },
    imageSrc: '/images/ferris-of-colors.svg',
  },
];
