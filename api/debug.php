<?php
// Log de debug
error_log("🔍 [DEBUG] Arquivo debug.php foi acessado");

// Verificar se o PHP está funcionando
echo "PHP está funcionando!<br>";
echo "Data e hora: " . date('Y-m-d H:i:s') . "<br>";
echo "Diretório atual: " . __DIR__ . "<br>";
echo "PHP Version: " . phpversion() . "<br>";

// Verificar se o arquivo config.php existe
if (file_exists('config.php')) {
    echo "✅ config.php existe<br>";
} else {
    echo "❌ config.php não existe<br>";
}

// Verificar se o arquivo login.php existe
if (file_exists('login.php')) {
    echo "✅ login.php existe<br>";
} else {
    echo "❌ login.php não existe<br>";
}

// Listar arquivos no diretório
echo "<br>Arquivos no diretório:<br>";
$files = scandir('.');
foreach ($files as $file) {
    if ($file != '.' && $file != '..') {
        echo "- $file<br>";
    }
}
?> 