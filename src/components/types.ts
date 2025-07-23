export enum Anchor {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  Center = 'center',
} 


export interface Size {
  widthRatio: number;
  heightRatio: number;
}


export interface Position {
  xRatio: number;
  yRatio: number;
} 
