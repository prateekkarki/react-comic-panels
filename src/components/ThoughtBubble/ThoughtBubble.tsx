import React from 'react';

interface Position {
  x: number;
  y: number;
}

type Anchor = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

interface ThoughtBubbleProps {
  animation?: string;
  anchor?: Anchor;
  position?: Position;
  children: React.ReactNode;
}

function getAnchorStyle(anchor: Anchor = 'top-left') {
  const style: React.CSSProperties = { position: 'absolute' };
  switch (anchor) {
    case 'top-left':
      style.top = 0; style.left = 0; break;
    case 'top-right':
      style.top = 0; style.right = 0; break;
    case 'bottom-left':
      style.bottom = 0; style.left = 0; break;
    case 'bottom-right':
      style.bottom = 0; style.right = 0; break;
    case 'center':
      style.top = '50%'; style.left = '50%'; style.transform = 'translate(-50%, -50%)'; break;
  }
  return style;
}
export const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ animation, anchor, position, children }) => {
  const anchorStyle = getAnchorStyle(anchor);
  const posStyle = position ? { left: position.x, top: position.y } : {};
  const style: React.CSSProperties = { ...anchorStyle, ...posStyle };
  if (animation) style.animation = animation;
  return (
    <div className="comicPanels__thought-bubble" style={style}>
      {children}
    </div>
  );
}; 