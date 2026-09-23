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
  // 1. Ana Ainza (Slack Profile Photo)
  {
    id: 'frame-ana',
    title: 'Ana Ainza',
    subtitle: 'INNOVATION & DEV ENGINEER',
    tag: 'FOUNDER',
    backTitle: 'Ana Ainza',
    description: 'Innovation & Development Engineer · Specialization in Smart Value Chains.',
    url: '',
    gradientBack: ['#482728', '#E7B5D0'],
    frameFinish: 'vintage-gold',
    nailColor: '#C9A84C',
    side: 'left',
    desktopPosition: {
      top: '7vh',
      left: '2.5vw',
      rotation: -3,
    },
    imageSrc: '/images/slack-profile.jpeg',
    tagColor: 'default',
  },
  // 2. LEFT WALL (bottom): Buddy (Ana's dog)
  {
    id: 'frame-buddy',
    title: 'Buddy',
    subtitle: "ANA'S DOG",
    tag: 'BUDDY',
    backTitle: 'Buddy',
    description: 'Brown Labrador. Best co-founder.',
    url: '',
    gradientBack: ['#E7B5D0', '#B6C8A9'],
    frameFinish: 'dark-walnut',
    nailColor: '#888888',
    side: 'left',
    desktopPosition: {
      top: '38vh',
      left: '4.5vw',
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
      top: '7vh',
      right: '2.5vw',
      rotation: 4,
    },
    imageSrc: '/images/sewing-machine.svg',
  },
  // 4. RIGHT WALL (bottom): Zayu.go / Hacks
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
    side: 'right',
    desktopPosition: {
      top: '38vh',
      right: '4.5vw',
      rotation: -3,
    },
    imageSrc: '/images/zayugo-map.svg',
    tagColor: 'orange',
  },
];
