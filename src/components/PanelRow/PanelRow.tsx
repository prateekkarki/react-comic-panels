import React from 'react';

export const PanelRow: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="comicPanels__panel-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      {children}
    </div>
  );
}; 