import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import OneClickStyle from './pages/OneClickStyle';
import ReferenceStyle from './pages/ReferenceStyle';
import ThreeViews from './pages/ThreeViews';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="one-click-style" element={<OneClickStyle />} />
          <Route path="reference-style" element={<ReferenceStyle />} />
          <Route path="three-views" element={<ThreeViews />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;