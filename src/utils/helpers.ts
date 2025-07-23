import { Anchor } from '../components/types';

interface Size {
  widthRatio: number;
  heightRatio: number;
}

export function getAnchorStyle(
  anchor: Anchor = Anchor.TopLeft,
  size: Size = { widthRatio: 0.5, heightRatio: 0.5 }
): React.CSSProperties {
  const initialStyle: React.CSSProperties = { position: 'absolute' };
  switch (anchor) {
    case Anchor.TopLeft:
      const topLeftStyle: React.CSSProperties = { ...initialStyle, top: 0, left: 0 };
      return topLeftStyle;
    case Anchor.TopRight:
      const topRightStyle: React.CSSProperties = {
        ...initialStyle,
        top: 0,
        left: `calc(${1 - size.widthRatio} * 100% - 5px)`,
      };
      return topRightStyle;
    case Anchor.BottomLeft:
      const bottomLeftStyle: React.CSSProperties = {
        ...initialStyle,
        top: `calc(${1 - size.heightRatio} * 100% - 5px)`,
        left: 0,
      };
      return bottomLeftStyle;
    case Anchor.BottomRight:
      const bottomRightStyle: React.CSSProperties = {
        ...initialStyle,
        top: `calc(${1 - size.heightRatio} * 100% - 5px)`,
        left: `calc(${1 - size.widthRatio} * 100% - 5px)`,
      };
      return bottomRightStyle;
    case Anchor.Center:
      const centerStyle: React.CSSProperties = {
        ...initialStyle,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
      return centerStyle;
  }
}
