<?php
require_once 'config.php';

// Definir Content-Type para JSON
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

try {
    // Buscar mensagens ordenadas por data de envio
    $stmt = $pdo->prepare("
        SELECT m.id, m.usuario_id, m.mensagem, m.data_envio, u.nome_completo as nome_usuario
        FROM mensagens m
        JOIN usuarios u ON m.usuario_id = u.id
        ORDER BY m.data_envio ASC
        LIMIT 100
    ");
    $stmt->execute();
    $mensagens = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'mensagens' => $mensagens
    ]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao buscar mensagens']);
}
?> 