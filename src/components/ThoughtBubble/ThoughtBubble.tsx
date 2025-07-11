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

function getTailProps(anchor: Anchor = 'top-left') {
  // Returns style for the tail
  let style: React.CSSProperties = { position: 'absolute', width: 32, height: 32, pointerEvents: 'none' };
  let circles: Array<{ cx: number; cy: number; r: number }>; // Bubble positions
  switch (anchor) {
    case 'top-left':
      style.left = 8; style.top = -24;
      circles = [
        { cx: 8, cy: 24, r: 6 },
        { cx: 16, cy: 16, r: 4 },
        { cx: 24, cy: 8, r: 2 }
      ];
      break;
    case 'top-right':
      style.right = 8; style.top = -24;
      circles = [
        { cx: 24, cy: 24, r: 6 },
        { cx: 16, cy: 16, r: 4 },
        { cx: 8, cy: 8, r: 2 }
      ];
      break;
    case 'bottom-left':
      style.left = 8; style.bottom = -24;
      circles = [
        { cx: 8, cy: 8, r: 6 },
        { cx: 16, cy: 16, r: 4 },
        { cx: 24, cy: 24, r: 2 }
      ];
      break;
    case 'bottom-right':
      style.right = 8; style.bottom = -24;
      circles = [
        { cx: 24, cy: 8, r: 6 },
        { cx: 16, cy: 16, r: 4 },
        { cx: 8, cy: 24, r: 2 }
      ];
      break;
    case 'center':
      style.left = '50%'; style.bottom = -24; style.transform = 'translateX(-50%)';
      circles = [
        { cx: 16, cy: 8, r: 6 },
        { cx: 16, cy: 16, r: 4 },
        { cx: 16, cy: 24, r: 2 }
      ];
      break;
    default:
      circles = [];
  }
  return { style, circles };
}

export const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ animation, anchor, position, children }) => {
  const anchorStyle = getAnchorStyle(anchor);
  const posStyle = position ? { left: position.x, top: position.y } : {};
  const style: React.CSSProperties = { ...anchorStyle, ...posStyle };
  if (animation) style.animation = animation;
  const { style: tailStyle, circles } = getTailProps(anchor);
  return (
    <div className="comicPanels__thought-bubble" style={style}>
      {children}
      <svg
        viewBox="0 0 32 32"
        style={tailStyle}
        width={32}
        height={32}
        className="comicPanels__thought-bubble-tail"
      >
        {circles.map((c, i) => (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="#fffbe7"
            stroke="#333"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
}; 