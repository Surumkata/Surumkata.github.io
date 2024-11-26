import React from 'react';
import { Routes, Route, HashRouter } from "react-router-dom";
import P5Sketch from './P5Sketch';
import MarkdownView from './MarkdownView';
import SpaceInvaders from './games/SpaceInvaders';

const App = () => {
  return (
      <HashRouter>
          <Routes>
              <Route path="/" element={<P5Sketch />} />
              <Route path="/:markdown_file" element={< MarkdownView/>} />
              <Route path="/games/space_invaders" element={< SpaceInvaders/>} />
          </Routes>
      </HashRouter> 
  );
}

export {App};