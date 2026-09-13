import { HangingFrameData } from '../components/HangingFrame';

export const HANGING_FRAMES_DATA: HangingFrameData[] = [
  // Two frames on the left side
  {
    id: 'frame-zayu',
    title: 'Zayu.go',
    subtitle: 'TIC Challenge',
    url: 'https://zayugo.netlify.app/',
    flowerType: 'marigold',
    frameFinish: 'vintage-gold',
    cordLength: 'short',
    side: 'left',
    imageSrc: '/images/dog-art.svg',
  },
  {
    id: 'frame-theo',
    title: 'Theo Learning',
    subtitle: 'Interactive EdTech',
    url: 'https://www.theolearning.xyz/',
    flowerType: 'lavender',
    frameFinish: 'dark-walnut',
    cordLength: 'tall',
    side: 'left',
  },

  // Two frames on the right side
  {
    id: 'frame-ferris',
    title: 'Ferris of Colors',
    subtitle: 'Tec Smart Parking',
    url: 'https://tec-smart-parking.netlify.app/',
    flowerType: 'ferris',
    frameFinish: 'vintage-gold',
    cordLength: 'tall',
    side: 'right',
    imageSrc: '/images/ferris-of-colors.svg',
    isWallFrame: true,
  },
  {
    id: 'frame-dolce',
    title: 'Dolce Puro',
    subtitle: 'Artisan Store',
    url: 'https://dolcepuro.netlify.app/?id=DP-ANAAINZA',
    flowerType: 'rose',
    frameFinish: 'rose-gold',
    cordLength: 'short',
    side: 'right',
  },
];
