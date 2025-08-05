<?php
require_once 'config.php';

// Definir Content-Type para JSON
header('Content-Type: application/json');

// Log de início da requisição
error_log("📝 [REGISTER] Iniciando requisição de registro");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log("❌ [REGISTER] Método não permitido: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

$rawInput = file_get_contents('php://input');
error_log("📄 [REGISTER] Dados brutos recebidos: " . $rawInput);

if (!$rawInput) {
    error_log("❌ [REGISTER] Dados não recebidos");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados não recebidos']);
    exit;
}

$input = json_decode($rawInput, true);
error_log("📄 [REGISTER] Dados decodificados: " . json_encode($input));

if (!$input) {
    error_log("❌ [REGISTER] Dados inválidos - JSON decode falhou");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
    exit;
}

$nome_completo = $input['nome_completo'] ?? '';
$login = $input['login'] ?? '';
$senha = $input['senha'] ?? '';
$confirmacao_senha = $input['confirmacao_senha'] ?? '';
$email = $input['email'] ?? '';
$telefone = $input['telefone'] ?? '';

// Validações
if (empty($nome_completo) || empty($login) || empty($senha) || empty($email) || empty($telefone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios']);
    exit;
}

if ($senha !== $confirmacao_senha) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'As senhas não coincidem']);
    exit;
}

if (strlen($senha) < 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'A senha deve ter pelo menos 6 caracteres']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

try {
    // Verificar se o login já existe
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE login = ?");
    $stmt->execute([$login]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Este login já está em uso']);
        exit;
    }

    // Verificar se o email já existe
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Este email já está em uso']);
        exit;
    }

    // Inserir novo usuário
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO usuarios (nome_completo, login, senha, email, telefone, progresso, aulas_assistidas, data_cadastro) VALUES (?, ?, ?, ?, ?, 0, '[]', NOW())");
    $stmt->execute([$nome_completo, $login, $senha_hash, $email, $telefone]);

    $usuario_id = $pdo->lastInsertId();

    // Buscar dados do usuário criado
    $stmt = $pdo->prepare("SELECT id, nome_completo, login, email, telefone, progresso, aulas_assistidas, data_cadastro FROM usuarios WHERE id = ?");
    $stmt->execute([$usuario_id]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    // Converter aulas_assistidas de string para array
    $aulas_assistidas = $usuario['aulas_assistidas'] ?: '[]';
    $usuario['aulas_assistidas'] = json_decode($aulas_assistidas, true);

    echo json_encode([
        'success' => true,
        'message' => 'Usuário criado com sucesso',
        'user' => $usuario
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao criar usuário']);
}
?> 