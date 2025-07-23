import styled from '@emotion/styled';

export const PanelRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 16px;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
`;
