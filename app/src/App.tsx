import React from 'react';
import { Routes, Route } from 'react-router-dom';

function Home(): React.JSX.Element {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome</h1>
      <p>React + Vite + TypeScript app is running.</p>
    </main>
  );
}

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
