import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkoutDay from './pages/WorkoutDay';

function App() {
  return (
    <>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/:dayId" element={<WorkoutDay />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
