import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
