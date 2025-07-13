import React from 'react';

interface PanelRowProps {
  size: number; // between 0 and 1
  children?: React.ReactNode;
}

export const PanelRow: React.FC<PanelRowProps> = ({ size, children }) => {
  if (size < 0 || size > 1) {
    console.warn('PanelRow size prop should be between 0 and 1.');
  }
  const flexBasis = `${Math.max(0, Math.min(1, size)) * 100}%`;
  return (
    <div
      className="comicPanels__panel-row"
      style={{ display: 'flex', flexDirection: 'row', width: '100%', flexBasis }}
    >
      {children}
    </div>
  );
}; 