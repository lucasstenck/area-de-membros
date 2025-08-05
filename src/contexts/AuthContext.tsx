import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginForm, CadastroForm, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginForm): Promise<boolean> => {
    try {
      console.log('🔐 Tentando fazer login:', { login: credentials.login });
      
      const response = await fetch('http://localhost:8000/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('📡 Resposta do servidor:', response.status, response.statusText);

      const data = await response.json();
      console.log('📄 Dados recebidos:', data);

      if (data.success) {
        console.log('✅ Login bem-sucedido:', data.user);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        console.error('❌ Erro no login:', data.message);
        throw new Error(data.message || 'Erro no login');
      }
    } catch (error) {
      console.error('💥 Erro no login:', error);
      return false;
    }
  };

  const register = async (userData: CadastroForm): Promise<{ success: boolean; message?: string }> => {
    try {
      console.log('📝 Tentando registrar usuário:', { login: userData.login, email: userData.email });
      
      const response = await fetch('http://localhost:8000/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('📡 Resposta do servidor (registro):', response.status, response.statusText);

      const data = await response.json();
      console.log('📄 Dados recebidos (registro):', data);

      if (data.success) {
        console.log('✅ Registro bem-sucedido:', data.user);
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      } else {
        console.log('❌ Registro falhou:', data.message);
        return { success: false, message: data.message || 'Erro no cadastro' };
      }
    } catch (error) {
      console.error('💥 Erro no registro:', error);
      return { success: false, message: 'Erro de conexão' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    updateUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 