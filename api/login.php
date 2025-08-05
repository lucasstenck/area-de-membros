<?php
require_once 'config.php';

// Definir Content-Type para JSON
header('Content-Type: application/json');

// Log de início da requisição
error_log("🔐 [LOGIN] Iniciando requisição de login");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log("❌ [LOGIN] Método não permitido: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

$rawInput = file_get_contents('php://input');
error_log("📄 [LOGIN] Dados brutos recebidos: " . $rawInput);

if (!$rawInput) {
    error_log("❌ [LOGIN] Dados não recebidos");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados não recebidos']);
    exit;
}

$input = json_decode($rawInput, true);
error_log("📄 [LOGIN] Dados decodificados: " . json_encode($input));

if (!$input) {
    error_log("❌ [LOGIN] Dados inválidos - JSON decode falhou");
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
    exit;
}

$login = $input['login'] ?? '';
$senha = $input['senha'] ?? '';

if (empty($login) || empty($senha)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Login e senha são obrigatórios']);
    exit;
}

try {
    error_log("🔍 [LOGIN] Buscando usuário com login: " . $login);
    
    // Buscar usuário pelo login
    $stmt = $pdo->prepare("SELECT id, nome_completo, login, senha, email, telefone, progresso, aulas_assistidas, data_cadastro FROM usuarios WHERE login = ?");
    $stmt->execute([$login]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        error_log("❌ [LOGIN] Usuário não encontrado: " . $login);
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Login ou senha incorretos']);
        exit;
    }
    
    error_log("✅ [LOGIN] Usuário encontrado: " . $usuario['nome_completo']);

    // Verificar senha
    error_log("🔐 [LOGIN] Verificando senha para usuário: " . $login);
    if (!password_verify($senha, $usuario['senha'])) {
        error_log("❌ [LOGIN] Senha incorreta para usuário: " . $login);
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Login ou senha incorretos']);
        exit;
    }
    
    error_log("✅ [LOGIN] Senha correta para usuário: " . $login);

    // Remover senha dos dados retornados
    unset($usuario['senha']);

    // Converter aulas_assistidas de string para array
    $aulas_assistidas = $usuario['aulas_assistidas'] ?: '[]';
    $usuario['aulas_assistidas'] = json_decode($aulas_assistidas, true);
    
    error_log("✅ [LOGIN] Login bem-sucedido para usuário: " . $usuario['nome_completo']);

    echo json_encode([
        'success' => true,
        'message' => 'Login realizado com sucesso',
        'user' => $usuario
    ]);

} catch(PDOException $e) {
    error_log("💥 [LOGIN] Erro de banco de dados: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao fazer login']);
}
?> 