-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS nomade_milionario CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE nomade_milionario;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    login VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    progresso INT DEFAULT 0,
    aulas_assistidas JSON,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_login (login),
    INDEX idx_email (email)
);

-- Tabela de mensagens do chat
CREATE TABLE IF NOT EXISTS mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario_id (usuario_id),
    INDEX idx_data_envio (data_envio)
);

-- Inserir alguns usuários de exemplo (senhas: 123456)
INSERT INTO usuarios (nome_completo, login, senha, email, telefone, progresso, aulas_assistidas) VALUES
('João Silva', 'joao123', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'joao@example.com', '(11) 99999-1111', 25, '[1, 2, 3]'),
('Maria Santos', 'maria456', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'maria@example.com', '(11) 99999-2222', 50, '[1, 2, 3, 4, 5, 6]'),
('Pedro Costa', 'pedro789', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'pedro@example.com', '(11) 99999-3333', 75, '[1, 2, 3, 4, 5, 6, 7, 8, 9]');

-- Inserir algumas mensagens de exemplo
INSERT INTO mensagens (usuario_id, mensagem, data_envio) VALUES
(1, 'Olá pessoal! Acabei de assistir a primeira aula, muito bom!', '2024-01-15 10:30:00'),
(2, 'Oi! Estou na aula 3, alguém mais por aqui?', '2024-01-15 11:15:00'),
(3, 'Galera, as aulas estão incríveis! Já estou na aula 6', '2024-01-15 12:00:00'),
(1, 'Alguém tem alguma dica sobre a aula 2?', '2024-01-15 14:20:00'),
(2, 'Sim! A aula 2 é fundamental para entender o nicho', '2024-01-15 14:25:00'); 