# Nômade Milionário - Área de Membros

Uma plataforma moderna para gerenciamento de cursos online com sistema de progresso individual, comunidade de membros e interface responsiva.

## Funcionalidades

### Sistema de Autenticação
- Registro de novos usuários
- Login seguro com validação
- Persistência de sessão
- Logout automático

### Gestão de Aulas
- 12 aulas com vídeos do YouTube integrados
- Player de vídeo nativo
- Marcação de aulas como assistidas
- Navegação entre aulas (anterior/próximo)
- Grid visual de progresso do curso

### Sistema de Progresso
- Progresso individual por usuário
- Cálculo automático de percentual
- Atualização em tempo real
- Estatísticas detalhadas (aulas assistidas, restantes, progresso)

### Comunidade
- Chat em tempo real entre membros
- Interface estilo Telegram
- Histórico de mensagens
- Indicador de usuários online

### Suporte
- Página de suporte dedicada
- Links diretos para WhatsApp e Email
- FAQ integrado
- Informações de contato

### Interface Moderna
- Design responsivo (mobile-first)
- Animações suaves com Framer Motion
- Gradientes modernos e efeitos visuais
- Tema escuro profissional
- Componentes reutilizáveis

## Tecnologias Utilizadas

### Frontend
- React 18 - Biblioteca JavaScript para interfaces
- TypeScript - Tipagem estática para maior segurança
- Tailwind CSS - Framework CSS utilitário
- Framer Motion - Biblioteca de animações
- React Router DOM - Roteamento da aplicação
- Lucide React - Ícones modernos

### Backend
- PHP 8+ - Linguagem de servidor
- MySQL - Banco de dados relacional
- PDO - Interface de acesso ao banco
- RESTful API - Arquitetura de API

### Ferramentas
- Vite - Build tool e dev server
- PostCSS - Processamento de CSS
- Autoprefixer - Prefixos CSS automáticos

## Pré-requisitos

- Node.js 16+
- PHP 8.0+
- MySQL 8.0+
- Composer (opcional)

## Instalação

### 1. Clone o repositório
```bash
git clone 
cd nomade-milionario
```

### 2. Instale as dependências do Frontend
```bash
npm install
```

### 3. Configure o banco de dados

#### 3.1. Crie o banco de dados
```sql
CREATE DATABASE nomade_milionario;
```

#### 3.2. Execute o script SQL
```bash
mysql -u root -p < database.sql
```

#### 3.3. Configure a conexão
Edite o arquivo `api/config.php`:
```php
$host = 'localhost';
$dbname = 'nomade_milionario';
$username = 'root';
$password = 'sua_senha_aqui';
```

### 4. Inicie os servidores

#### Frontend (React)
```bash
npm start
```
Acesse: http://localhost:3000

#### Backend (PHP)
```bash
cd api
php -S localhost:8000
```

## Estrutura do Projeto

```
area-membros/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx      # Cabeçalho da aplicação
│   │   ├── Dashboard.tsx   # Página principal
│   │   ├── AulaView.tsx    # Visualizador de aulas
│   │   ├── Login.tsx       # Formulário de login
│   │   ├── Register.tsx    # Formulário de registro
│   │   ├── Comunidade.tsx  # Chat da comunidade
│   │   └── Suporte.tsx     # Página de suporte
│   ├── contexts/           # Contextos React
│   │   └── AuthContext.tsx # Contexto de autenticação
│   ├── data/              # Dados estáticos
│   │   └── aulas.ts       # Lista de aulas
│   ├── types/             # Definições TypeScript
│   │   └── index.ts       # Interfaces e tipos
│   └── App.tsx           # Componente principal
├── api/                   # Backend PHP
│   ├── config.php        # Configuração do banco
│   ├── login.php         # Endpoint de login
│   ├── register.php      # Endpoint de registro
│   ├── marcar-aula.php   # Marcar aula como assistida
│   ├── mensagens.php     # Buscar mensagens do chat
│   └── enviar-mensagem.php # Enviar mensagem
├── public/               # Arquivos públicos
├── database.sql          # Script do banco de dados
└── package.json          # Dependências Node.js
```

## Como Usar

### 1. Registro de Usuário
- Acesse a página inicial
- Clique em "Criar Nova Conta"
- Preencha todos os campos obrigatórios
- Clique em "Criar Conta"

### 2. Login
- Use suas credenciais de login
- O sistema manterá você logado

### 3. Navegação
- Dashboard: Visão geral do progresso
- Aulas: Assista aos vídeos e marque como assistidas
- Comunidade: Chat com outros membros
- Suporte: Entre em contato para ajuda

### 4. Progresso
- Cada aula assistida aumenta seu progresso
- Visualize estatísticas em tempo real
- Acompanhe suas conquistas

## Configuração Avançada

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_SITE_NAME=Nômade Milionário
```

### Personalização de Cores
Edite `src/index.css` para personalizar o tema:
```css
:root {
  --primary-yellow: #fbbf24;
  --secondary-yellow: #f59e0b;
  /* ... outras cores */
}
```

### Adicionando Novas Aulas
Edite `src/data/aulas.ts`:
```typescript
export const aulas: Aula[] = [
  {
    id: 13,
    titulo: "Nova Aula - Título",
    video_url: "https://www.youtube.com/watch?v=VIDEO_ID",
    video_id: "VIDEO_ID",
    duracao: "45:30",
    descricao: "Descrição da nova aula"
  }
];
```

## Teste

### Usuários de Teste
O banco de dados inclui usuários de teste:
- Login: `joao123` | Senha: `123456`
- Login: `maria456` | Senha: `123456`
- Login: `pedro789` | Senha: `123456`

### Testando Funcionalidades
1. Login: Use as credenciais acima
2. Progresso: Assista aulas e veja o progresso atualizar
3. Chat: Envie mensagens na comunidade
4. Responsividade: Teste em diferentes dispositivos

## Segurança

- Senhas hasheadas com bcrypt
- Validação de entrada no servidor
- Prepared statements para prevenir SQL injection
- CORS configurado adequadamente
- Sanitização de dados

## Responsividade

O projeto é totalmente responsivo e funciona em:
- Smartphones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Telas grandes (1440px+)

## Design System

### Cores
- Primária: Amarelo (#fbbf24)
- Secundária: Laranja (#f59e0b)
- Fundo: Preto (#000000)
- Texto: Branco (#ffffff)
- Acentos: Cinza (#9ca3af)

### Tipografia
- Fonte: Inter (Google Fonts)
- Tamanhos: Sistema de escala responsiva
- Pesos: 400 (normal), 600 (semibold), 700 (bold)

### Animações
- Entrada: Fade-in com slide
- Hover: Scale e glow effects
- Transições: 300ms cubic-bezier
- Loading: Spinner personalizado

## Deploy

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Hostinger/DigitalOcean)
1. Faça upload dos arquivos da pasta `api/`
2. Configure o banco de dados MySQL
3. Atualize as configurações em `config.php`

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Suporte

- Email: suporte@nomademilionario.com
- WhatsApp: +55 (11) 99999-9999
- Telefone: +55 (11) 8888-8888

## Agradecimentos

- [React](https://reactjs.org/) - Biblioteca JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animações
- [Lucide](https://lucide.dev/) - Ícones
- [YouTube API](https://developers.google.com/youtube) - Player de vídeo

---

**Desenvolvido com ❤️ para a comunidade Nômade Milionário**

*Transforme sua vida digital e alcance a liberdade financeira!* 