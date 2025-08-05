import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AulaView from './components/AulaView';
import Comunidade from './components/Comunidade';
import Suporte from './components/Suporte';

const AppContent: React.FC = () => {
  const { user, isLoading, login, register } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {showLogin ? (
          <Login
            onLogin={async (credentials) => {
              const success = await login(credentials);
              return success;
            }}
            onSwitchToRegister={() => setShowLogin(false)}
          />
        ) : (
          <Register
            onRegister={async (userData) => {
              const result = await register(userData);
              return result;
            }}
            onSwitchToLogin={() => setShowLogin(true)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aula/:id" element={<AulaView />} />
        <Route path="/comunidade" element={<Comunidade />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App; 