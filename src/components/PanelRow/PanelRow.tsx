import React from 'react';
import { PanelRowContainer } from './style';

interface PanelRowProps {
  size: number; // between 0 and 1
  children?: React.ReactNode;
}

export const PanelRow: React.FC<PanelRowProps> = ({ size, children }) => {
  if (size < 0 || size > 1) {
    console.warn('PanelRow size prop should be between 0 and 1.');
  }
  const flexBasis = `${Math.max(0, Math.min(1, size)) * 100}%`;
  return <PanelRowContainer style={{ flexBasis }}>{children}</PanelRowContainer>;
};
