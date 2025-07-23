import React, { useRef } from 'react';
import { Anchor, Position, Size } from '../types';
import { Textfit } from '../Textfit';
import { getAnchorStyle } from '../../utils/helpers';
import { SpeechBubbleContainer, SpeechBubbleInner } from './style';

interface SpeechBubbleProps {
  animation?: string;
  anchor?: Anchor;
  position?: Position;
  size?: Size;
  children: React.ReactNode;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  animation,
  anchor,
  position,
  size = { widthRatio: 0.3, heightRatio: 0.3 },
  children,
}) => {
  const anchorStyle = getAnchorStyle(anchor, size);
  const containerRef = useRef<HTMLDivElement>(null);
  const posStyle = position
    ? { left: position.xRatio * 100 + '%', top: position.yRatio * 100 + '%' }
    : {};
  const style: React.CSSProperties = {
    ...anchorStyle,
    ...posStyle,
    width: `${size.widthRatio * 100}%`,
    height: `${size.heightRatio * 100}%`,
  };
  if (animation) style.animation = animation;
  return (
    <SpeechBubbleContainer style={style} ref={containerRef}>
      <SpeechBubbleInner>
        <Textfit>{children}</Textfit>
      </SpeechBubbleInner>
    </SpeechBubbleContainer>
  );
};
