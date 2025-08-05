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
$aula_id = $input['aula_id'] ?? 0;

if (!$usuario_id || !$aula_id) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID do usuário e da aula são obrigatórios']);
    exit;
}

try {
    // Buscar dados do usuário
    $stmt = $pdo->prepare("SELECT aulas_assistidas, progresso FROM usuarios WHERE id = ?");
    $stmt->execute([$usuario_id]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Usuário não encontrado']);
        exit;
    }

    // Converter aulas_assistidas de string para array
    $aulas_assistidas = json_decode($usuario['aulas_assistidas'], true) ?: [];

    // Verificar se a aula já foi assistida
    if (in_array($aula_id, $aulas_assistidas)) {
        echo json_encode(['success' => true, 'message' => 'Aula já estava marcada como assistida']);
        exit;
    }

    // Adicionar aula à lista de assistidas
    $aulas_assistidas[] = $aula_id;
    sort($aulas_assistidas); // Ordenar para manter consistência

    // Calcular novo progresso (assumindo 12 aulas no total)
    $total_aulas = 12;
    $novo_progresso = round((count($aulas_assistidas) / $total_aulas) * 100);

    // Atualizar usuário
    $stmt = $pdo->prepare("UPDATE usuarios SET aulas_assistidas = ?, progresso = ? WHERE id = ?");
    $stmt->execute([json_encode($aulas_assistidas), $novo_progresso, $usuario_id]);

    echo json_encode([
        'success' => true,
        'message' => 'Aula marcada como assistida',
        'progresso' => $novo_progresso,
        'aulas_assistidas' => $aulas_assistidas
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao marcar aula como assistida']);
}
?> 