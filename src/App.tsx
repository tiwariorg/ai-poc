import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

/**
 * Root application component.
 *
 * Responsibilities:
 * - Wraps the entire tree in `<AuthProvider>` so every descendant can access
 *   authentication state via `useAuthContext`.
 * - Wraps the tree in `<BrowserRouter>` to enable client-side routing.
 * - Declares the top-level route table:
 *   - `/login`     → `<LoginPage />`
 *   - `/dashboard` → `<DashboardPage />`
 *   - `*`          → redirects to `/login` (catch-all for unknown paths)
 */
function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Catch-all: redirect any unmatched path to the login screen */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
