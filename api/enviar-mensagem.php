<?php
require_once 'config.php';

// Definir Content-Type para JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

$rawInput = file_get_contents('php://input');
if (!$rawInput) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados não recebidos']);
    exit;
}

$input = json_decode($rawInput, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dados inválidos']);
    exit;
}

$usuario_id = $input['usuario_id'] ?? 0;
$mensagem = trim($input['mensagem'] ?? '');

if (!$usuario_id || empty($mensagem)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID do usuário e mensagem são obrigatórios']);
    exit;
}

if (strlen($mensagem) > 500) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'A mensagem deve ter no máximo 500 caracteres']);
    exit;
}

try {
    // Verificar se o usuário existe
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE id = ?");
    $stmt->execute([$usuario_id]);
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Usuário não encontrado']);
        exit;
    }

    // Inserir mensagem
    $stmt = $pdo->prepare("INSERT INTO mensagens (usuario_id, mensagem, data_envio) VALUES (?, ?, NOW())");
    $stmt->execute([$usuario_id, $mensagem]);

    echo json_encode([
        'success' => true,
        'message' => 'Mensagem enviada com sucesso'
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar mensagem']);
}
?> 