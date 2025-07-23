import React from 'react';
import { Anchor, Position } from '../types';
import { getAnchorStyle } from '../../utils/helpers';
import { PanelImageContainer } from './style';

interface PanelImageProps {
  image: string | React.ReactNode;
  animation?: string;
  position?: Position;
  anchor?: Anchor;
}

export const PanelImage: React.FC<PanelImageProps> = ({ image, animation, position, anchor }) => {
  const anchorStyle = getAnchorStyle(anchor);
  const posStyle = position
    ? { left: position.xRatio * 100 + '%', top: position.yRatio * 100 + '%' }
    : {};
  const style: React.CSSProperties = { ...anchorStyle, ...posStyle };
  if (animation) style.animation = animation;
  return (
    <PanelImageContainer style={style}>
      {typeof image === 'string' ? (
        <img src={image} alt="panel" style={{ width: '100%', height: 'auto' }} />
      ) : (
        image
      )}
    </PanelImageContainer>
  );
};
