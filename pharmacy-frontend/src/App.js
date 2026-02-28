import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';  // Add this import
import './index.css';

// Main app content with navigation
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user } = useAuth();

  // Simple navigation function
  const navigate = (page) => {
    setCurrentPage(page);
    // Update URL but don't reload
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
  };

  // Render based on current page
  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login navigate={navigate} />;
      case 'register':
        return <Register navigate={navigate} />;
      case 'dashboard':
        // Protect dashboard route
        if (!user) {
          setTimeout(() => navigate('login'), 0);
          return null;
        }
        return <Dashboard navigate={navigate} />;
      case 'settings':  // Add settings case
        // Protect settings route
        if (!user) {
          setTimeout(() => navigate('login'), 0);
          return null;
        }
        return <Settings navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} user={user} />;
    }
  };

  return renderPage();
}

// Main App component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;