import React from 'react';
import '../comicPanels.css';

export const Comic: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="comicPanels">{children}</div>;
}; 