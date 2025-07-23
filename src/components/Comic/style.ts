import styled from '@emotion/styled';

export const ComicContainer = styled.div<{
  width?: string | number;
  background?: string;
  aspectRatio?: number;
}>`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 12px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  background: ${({ background }) => background || '#f4f4f4'};
  ${({ aspectRatio }) => (aspectRatio ? `aspect-ratio: ${aspectRatio};` : '')}
`;
