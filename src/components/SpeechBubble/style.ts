import styled from '@emotion/styled';

export const SpeechBubbleContainer = styled.div`
  background: #fffbe7;
  border: 2px solid #333;
  border-radius: 10px;
  font-size: clamp(12px, 2vw, 32px);
  color: #222;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  max-width: 80%;
  word-break: break-word;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpeechBubbleInner = styled.div`
  padding: 0px 10px;
  height: 100%;
`;
