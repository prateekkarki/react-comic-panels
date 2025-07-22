import React, { useRef, useState, useEffect } from 'react';
import { Anchor } from '../types';
import { Textfit } from '../Textfit';

interface Position {
  xRatio: number;
  yRatio: number;
}
interface Size {
  widthRatio: number;
  heightRatio: number;
}

interface SpeechBubbleProps {
  animation?: string;
  anchor?: Anchor;
  position?: Position;
  size?: Size;
  children: React.ReactNode;
}

function getAnchorStyle(anchor: Anchor = Anchor.TopLeft, size: Size): React.CSSProperties {
  const initialStyle: React.CSSProperties = { position: 'absolute' };
  switch (anchor) {
    case Anchor.TopLeft:
      const topLeftStyle: React.CSSProperties = { ...initialStyle, top: 0, left: 0 };
      return topLeftStyle;
    case Anchor.TopRight:
      const topRightStyle: React.CSSProperties = { ...initialStyle, top: 0, left: `calc(${1 - size.widthRatio} * 100% - 5px)` };
      return topRightStyle;
    case Anchor.BottomLeft:
      const bottomLeftStyle: React.CSSProperties = { ...initialStyle, top: `calc(${1 - size.heightRatio} * 100% - 5px)`, left: 0 };
      return bottomLeftStyle;
    case Anchor.BottomRight:
      const bottomRightStyle: React.CSSProperties = { ...initialStyle, top: `calc(${1 - size.heightRatio} * 100% - 5px)`, left: `calc(${1 - size.widthRatio} * 100% - 5px)` };
      return bottomRightStyle;
    case Anchor.Center:
      const centerStyle: React.CSSProperties = { ...initialStyle, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      return centerStyle;
  }
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ animation, anchor, position, size = { widthRatio: 0.3, heightRatio: 0.3 }, children }) => {
  const anchorStyle = getAnchorStyle(anchor, size);
  const containerRef = useRef<HTMLDivElement>(null);
  const posStyle = position ? { left: position.xRatio * 100 + '%', top: position.yRatio * 100 + '%' } : {};
  const style: React.CSSProperties = { ...anchorStyle, ...posStyle, width: `${size.widthRatio * 100}%`, height: `${size.heightRatio * 100}%` };


  if (animation) style.animation = animation;

  return (
    <div className="comicPanels__speech-bubble" style={style} ref={containerRef}>
      <div className="comicPanels__speech-bubble-inner" >
        <Textfit>
          {children}
        </Textfit>
      </div>
    </div>
  );
}; 