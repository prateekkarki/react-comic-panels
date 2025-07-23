import React from 'react';
import { PanelContainer } from './style';

interface PanelProps {
  size?: number;
  background?: string;
  children?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ size = 1, background, children }) => {
  const style: React.CSSProperties = {
    flex: size,
    background: background ? (background.startsWith('url(') ? background : background.startsWith('#') ? background : `url(${background})`) : undefined,
    backgroundSize: background ? 'cover' : undefined,
    backgroundPosition: background ? 'center' : undefined,
    maxWidth: `${100 * size}%`,
  };
  return (
    <PanelContainer style={style}>
      {children}
    </PanelContainer>
  );
}; 