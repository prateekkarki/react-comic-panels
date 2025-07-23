import React from 'react';
import { Anchor, Position, Size } from '../types';
import { getAnchorStyle } from '../../utils/helpers';
import { Textfit } from '../Textfit';
import { ThoughtBubbleContainer, ThoughtBubbleInner } from './style';

interface ThoughtBubbleProps {
  animation?: string;
  anchor?: Anchor;
  position?: Position;
  size?: Size;
  children: React.ReactNode;
}

export const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ animation, anchor, position, size = { widthRatio: 0.3, heightRatio: 0.3 }, children }) => {
  const anchorStyle = getAnchorStyle(anchor, size);
  const posStyle = position ? { left: position.xRatio * 100 + '%', top: position.yRatio * 100 + '%' } : {};
  const style: React.CSSProperties = { ...anchorStyle, ...posStyle, width: `${size.widthRatio * 100}%`, height: `${size.heightRatio * 100}%` };
  if (animation) style.animation = animation;
  return (
    <ThoughtBubbleContainer style={style}>
      <ThoughtBubbleInner>
        <Textfit>
          {children}
        </Textfit>      
      </ThoughtBubbleInner>
    </ThoughtBubbleContainer>
  );
}; 