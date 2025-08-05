# Nômade Milionário - Área de Membros

Plataforma para gerenciamento de cursos online com React, TypeScript e PHP. Sistema de autenticação, progresso individual, player de vídeo integrado, comunidade com chat e interface responsiva.

## Funcionalidades

- Sistema de autenticação
- Progresso individual por usuário
- Player de vídeo integrado (12 aulas)
- Chat em tempo real
- Interface responsiva
- Dashboard personalizado

## Tecnologias

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: PHP 8+, MySQL
- **Animações**: Framer Motion

## Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/lucasstenck/area-de-membros.git
cd area-de-membros
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
```bash
mysql -u root -p < database.sql
```

### 4. Configure a conexão
Edite `api/config.php` com suas credenciais do MySQL.

### 5. Inicie os servidores

**Frontend:**
```bash
npm start
```

**Backend:**
```bash
cd api
php -S localhost:8000
```

## Estrutura

```
area-membros/
├── src/              # Frontend React
├── api/              # Backend PHP
├── public/           # Arquivos públicos
└── database.sql      # Script do banco
```

## Usuários de Teste

- Login: `joao123` | Senha: `123456`
- Login: `maria456` | Senha: `123456`
- Login: `pedro789` | Senha: `123456`

---

**Desenvolvido para a comunidade Nômade Milionário** 