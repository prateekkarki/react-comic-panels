import React from 'react';

interface PanelProps {
  size?: number;
  background?: string;
  children?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ size = 1, background, children }) => {
  const style: React.CSSProperties = {
    flex: size,
    position: 'relative',
    background: background ? (background.startsWith('url(') ? background : background.startsWith('#') ? background : `url(${background})`) : undefined,
    backgroundSize: background ? 'cover' : undefined,
    backgroundPosition: background ? 'center' : undefined,
    minWidth: 0,
    maxWidth: `${100 * size}%`,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  };
  return (
    <div className="comicPanels__panel" style={style}>
      {children}
    </div>
  );
}; 