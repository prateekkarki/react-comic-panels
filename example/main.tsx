import React from 'react';
import ReactDOM from 'react-dom/client';
import { Comic, PanelRow, Panel, PanelImage, SpeechBubble, ThoughtBubble } from '../src';
import { Anchor } from '../src/components/types';

const App = () => (
  <div style={{ padding: 20 }}>
    <Comic>
      <PanelRow size={0.5}>
        <Panel size={0.5} background="#333">
          <PanelImage
            animation="slide-in-left 0.7s ease"
            image="/public/001.png"
            anchor={Anchor.TopLeft}
          />
          <SpeechBubble
            animation="rotate(90deg) 0.5s"
            anchor={Anchor.BottomRight}
            size={{ widthRatio: 0.5, heightRatio: 0.2 }}
            // position={{ xRatio: 0, yRatio: 0.1 }}
          >
            Whoa… this one’s faster, lighter, and has built-in AI! Time to migrate everything.
          </SpeechBubble>
        </Panel>
        <Panel size={0.5} background="#333">
          <PanelImage image="/public/002.png" />
          <ThoughtBubble anchor={Anchor.BottomRight} size={{ widthRatio: 0.5, heightRatio: 0.2 }}>
            Okay… just need to rewrite the routing logic, the state manager, and... the entire app.
          </ThoughtBubble>
        </Panel>
      </PanelRow>
      <PanelRow size={0.5}>
        <Panel size={0.5} background="#333">
          <PanelImage image="/public/003.png" />
          <ThoughtBubble anchor={Anchor.BottomRight} size={{ widthRatio: 0.5, heightRatio: 0.2 }}>
            Guess I’ll migrate again.
          </ThoughtBubble>
        </Panel>
        <Panel size={0.5} background="#333">
          {/* <SpeechBubble anchor={Anchor.Center}>Developers don't age, they just accumulate tech debt.</SpeechBubble> */}
        </Panel>
      </PanelRow>
    </Comic>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
