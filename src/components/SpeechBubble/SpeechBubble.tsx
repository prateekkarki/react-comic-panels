import React from 'react';

interface Position {
  x: number;
  y: number;
}

type Anchor = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

interface SpeechBubbleProps {
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

function getTailProps(anchor: Anchor = 'top-left') {
  // Returns style and SVG transform for the tail
  let style: React.CSSProperties = { position: 'absolute', width: 32, height: 32 };
  let transform = '';
  switch (anchor) {
    case 'top-left':
      style.left = 16; style.top = -18; transform = 'rotate(180)'; break;
    case 'top-right':
      style.right = 16; style.top = -18; transform = 'scaleX(-1) rotate(180)'; break;
    case 'bottom-left':
      style.left = 16; style.bottom = -18; transform = ''; break;
    case 'bottom-right':
      style.right = 16; style.bottom = -18; transform = 'scaleX(-1)'; break;
    case 'center':
      style.left = '50%'; style.bottom = -18; style.transform = 'translateX(-50%)'; break;
  }
  return { style, transform };
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ animation, anchor, position, children }) => {
  const anchorStyle = getAnchorStyle(anchor);
  const posStyle = position ? { left: position.x, top: position.y } : {};
  const style: React.CSSProperties = { ...anchorStyle, ...posStyle };
  if (animation) style.animation = animation;
  const { style: tailStyle, transform: tailTransform } = getTailProps(anchor);
  return (
    <div className="comicPanels__speech-bubble" style={style}>
      {children}
      <svg
        viewBox="0 0 32 32"
        style={tailStyle}
        width={32}
        height={32}
        className="comicPanels__speech-bubble-tail"
      >
        <path
          d="M16 0 C18 12, 28 16, 16 32 C4 16, 14 12, 16 0 Z"
          fill="#fffbe7"
          stroke="#333"
          strokeWidth="2"
          transform={tailTransform}
        />
      </svg>
    </div>
  );
}; 