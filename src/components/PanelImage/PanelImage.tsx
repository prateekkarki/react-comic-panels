import React from 'react';

interface Position {
  x: number;
  y: number;
}

type Anchor = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

interface PanelImageProps {
  image: string | React.ReactNode;
  animation?: string;
  position?: Position;
  anchor?: Anchor;
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

export const PanelImage: React.FC<PanelImageProps> = ({ image, animation, position, anchor }) => {
  const anchorStyle = getAnchorStyle(anchor);
  const posStyle = position ? { left: position.x, top: position.y } : {};
  const style: React.CSSProperties = { ...anchorStyle, ...posStyle };
  if (animation) style.animation = animation;
  return (
    <div className="comicPanels__panel-image" style={style}>
      {typeof image === 'string' ? <img src={image} alt="panel" style={{ width: '100%', height: 'auto' }} /> : image}
    </div>
  );
}; 