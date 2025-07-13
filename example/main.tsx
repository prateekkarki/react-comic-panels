import React from 'react';
import ReactDOM from 'react-dom/client';
import { Comic, PanelRow, Panel, PanelImage, SpeechBubble, ThoughtBubble } from '../src';

const App = () => (
  <div style={{ padding: 20}}>
  <Comic  >
    <PanelRow size={0.5}>
      <Panel size={0.5} background="#333">
        <PanelImage
          animation="slide-in-left 0.7s ease"
          image="/public/001.png"
          anchor="top-left"
        />
        <SpeechBubble
          animation="rotate(90deg) 0.5s"
          anchor="top-left"
          position={{ x: 100, y: 50 }}
        >
          Whoa… this one’s faster, lighter, and has built-in AI! Time to migrate everything.
        </SpeechBubble>
      </Panel>
      <Panel size={0.5} background="#333">
        <PanelImage image="/public/002.png"  />
        <ThoughtBubble anchor="bottom-right">Okay… just need to rewrite the routing logic, the state manager, and... the entire app.</ThoughtBubble>
      </Panel>
    </PanelRow>
    <PanelRow size={0.5}>
      <Panel size={0.5} background="#333">
        <PanelImage image="/public/003.png" position={{ x: 0, y: 0 }} />
        <ThoughtBubble anchor="bottom-right">Guess I’ll migrate again.</ThoughtBubble>
      </Panel>
      <Panel size={0.5} background="#333">
        <SpeechBubble anchor="center">Developers don't age, they just accumulate tech debt.</SpeechBubble>
      </Panel>
    </PanelRow>
  </Comic>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
