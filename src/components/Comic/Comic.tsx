import React from 'react';
import { ComicContainer } from './style';

interface ComicProps {
  height?: string | number;
  width?: string | number;
  background?: string;
  aspectRatio?: number;
  children?: React.ReactNode;
}

export const Comic: React.FC<ComicProps> = ({ width = '100%', aspectRatio = 1, background = '#f4f4f4', children }) => {
  return <ComicContainer width={width} background={background} aspectRatio={aspectRatio}>{children}</ComicContainer>;
}; 