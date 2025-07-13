import React from 'react';
import '../comicPanels.css';

interface ComicProps {
  height?: string | number;
  width?: string | number;
  background?: string;
  aspectRatio?: number;
  children?: React.ReactNode;
}

export const Comic: React.FC<ComicProps> = ({  width = '100%', aspectRatio = 1, background = '#f4f4f4', children }) => {
  const style: React.CSSProperties = {  width:aspectRatio ? undefined : width, background, aspectRatio };
  return <div className="comicPanels" style={style}>{children}</div>;
}; 