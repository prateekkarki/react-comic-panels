import styled from '@emotion/styled';

export const Parent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: inline-block;
  white-space: normal;
`;

export const WrapperHidden = styled(Wrapper)`
  visibility: hidden;
`;

export const WrapperVisible = styled(Wrapper)`
  visibility: visible;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`; 