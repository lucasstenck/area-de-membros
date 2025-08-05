export interface User {
  id: number;
  nome_completo: string;
  login: string;
  email: string;
  telefone: string;
  progresso: number;
  aulas_assistidas: number[];
  data_cadastro: string;
}

export interface Aula {
  id: number;
  titulo: string;
  video_url: string;
  video_id: string;
  duracao: string;
  descricao: string;
}

export interface MensagemChat {
  id: number;
  usuario_id: number;
  nome_usuario: string;
  mensagem: string;
  data_envio: string;
}

export interface LoginForm {
  login: string;
  senha: string;
}

export interface CadastroForm {
  nome_completo: string;
  login: string;
  senha: string;
  confirmacao_senha: string;
  email: string;
  telefone: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginForm) => Promise<boolean>;
  logout: () => void;
  register: (userData: CadastroForm) => Promise<{ success: boolean; message?: string }>;
  updateUser: (user: User) => void;
  isLoading: boolean;
} 