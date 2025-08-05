<?php
// Verificar se há logs do PHP
$log_file = ini_get('error_log');
if (!$log_file) {
    $log_file = 'php_errors.log';
}

echo "<h2>Logs do PHP</h2>";
echo "<p>Arquivo de log: $log_file</p>";

if (file_exists($log_file)) {
    echo "<h3>Últimas 20 linhas do log:</h3>";
    echo "<pre>";
    $lines = file($log_file);
    $last_lines = array_slice($lines, -20);
    foreach ($last_lines as $line) {
        echo htmlspecialchars($line);
    }
    echo "</pre>";
} else {
    echo "<p>Arquivo de log não encontrado.</p>";
}

// Verificar logs do sistema
echo "<h3>Logs do sistema (últimas 10 linhas):</h3>";
echo "<pre>";
$output = shell_exec('tail -n 10 ' . escapeshellarg($log_file) . ' 2>&1');
echo htmlspecialchars($output);
echo "</pre>";
?> 