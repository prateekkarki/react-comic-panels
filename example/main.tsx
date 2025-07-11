import React from 'react';
import ReactDOM from 'react-dom/client';
import { Comic, PanelRow, Panel, PanelImage, SpeechBubble, ThoughtBubble } from '../src';

const App = () => (
  <div style={{ padding: 20 }}>
  <Comic>
    <PanelRow>
      <Panel size={0.3} background="#333">
        <PanelImage
          animation="slide-in-left 0.7s ease"
          image="/img1.png"
          position={{ x: 10, y: 20 }}
          anchor="top-left"
        />
        <PanelImage
          image={<img src="/img2.png" alt="custom" style={{ width: 60, height: 60 }} />}
          position={{ x: 100, y: 50 }}
          anchor="center"
        />
        <SpeechBubble
          animation="rotate(90deg) 0.5s"
          anchor="top-left"
          position={{ x: 100, y: 50 }}
        >
          Watch out!
        </SpeechBubble>
      </Panel>
      <Panel size={0.7} background="url(/scene.png)">
        <PanelImage image="/hero.png" position={{ x: 120, y: 80 }} />
        <ThoughtBubble anchor="bottom-right">Hmm...</ThoughtBubble>
      </Panel>
    </PanelRow>
  </Comic>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
