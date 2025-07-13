import React from 'react';
import Textfit from '../Textfit';

interface Position {
  xRatio: number;
  yRatio: number;
}
interface Size {
  widthRatio: number;
  heightRatio: number;
}

type Anchor = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

interface SpeechBubbleProps {
  animation?: string;
  anchor?: Anchor;
  position?: Position;
  size?: Size;
  children: React.ReactNode;
}

function getAnchorStyle(anchor: Anchor = 'top-left', size: Size): React.CSSProperties {
  const initialStyle: React.CSSProperties = { position: 'absolute' };
  switch (anchor) {
    case 'top-left':
      const topLeftStyle: React.CSSProperties = { ...initialStyle, top: 0, left: 0 };
      return topLeftStyle;
    case 'top-right':
      const topRightStyle: React.CSSProperties = { ...initialStyle, top: 0, left: `calc(${1 - size.widthRatio} * 100% - 5px)` };
      return topRightStyle;
    case 'bottom-left':
      const bottomLeftStyle: React.CSSProperties = { ...initialStyle, top: `calc(${1 - size.heightRatio} * 100% - 5px)`, left: 0 };
      return bottomLeftStyle;
    case 'bottom-right':
      const bottomRightStyle: React.CSSProperties = { ...initialStyle, top: `calc(${1 - size.heightRatio} * 100% - 5px)`, left: `calc(${1 - size.widthRatio} * 100% - 5px)` };
      return bottomRightStyle;
    case 'center':
      const centerStyle: React.CSSProperties = { ...initialStyle, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      return centerStyle;
  }
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

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({ animation, anchor, position, size = { widthRatio: 0.3, heightRatio: 0.3 }, children }) => {
  const anchorStyle = getAnchorStyle(anchor, size);
  const posStyle = position ? { left: position.xRatio * 100 + '%', top: position.yRatio * 100 + '%' } : {};
  const style: React.CSSProperties = { ...anchorStyle, ...posStyle, width: `${size.widthRatio * 100}%`, height: `${size.heightRatio * 100}%` };
  if (animation) style.animation = animation;
  const { style: tailStyle, transform: tailTransform } = getTailProps(anchor);
  return (
    <div className="comicPanels__speech-bubble" style={style}>
      <div className="comicPanels__speech-bubble-inner" >
        <Textfit style={{ width: '100%', height: '100%' }}>
          {children}
        </Textfit>
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
    </div>
  );
}; 