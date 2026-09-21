import React from 'react';
import { PaintingData } from '../data/framesData';
import { InteractivePainting } from './InteractivePainting';

interface PaintingColumnProps {
  paintings: [PaintingData, PaintingData];
  className?: string;
}

export const PaintingColumn: React.FC<PaintingColumnProps> = ({ paintings, className = '' }) => {
  return (
    <div className={`flex flex-col gap-6 items-center justify-around h-full py-2 ${className}`}>
      <InteractivePainting painting={paintings[0]} isMobile={false} />
      <InteractivePainting painting={paintings[1]} isMobile={false} />
    </div>
  );
};

export default PaintingColumn;
