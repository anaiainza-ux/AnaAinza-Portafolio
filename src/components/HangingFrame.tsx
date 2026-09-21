import React from 'react';
import { PaintingData } from '../data/framesData';
import { InteractivePainting } from './InteractivePainting';

export type HangingFrameData = PaintingData;

export interface HangingFrameProps {
  frame: PaintingData;
  isCompact?: boolean;
  isMobileGrid?: boolean;
  className?: string;
  onClick?: () => void;
}

export const HangingFrame: React.FC<HangingFrameProps> = ({
  frame,
  isMobileGrid = false,
}) => {
  return <InteractivePainting painting={frame} isMobile={isMobileGrid} />;
};

export default HangingFrame;
