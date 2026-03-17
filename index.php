<?php
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);
$path = trim($path, '/');

// Define rutas disponibles
$routes = [
    '' => 'index.html',
    'index' => 'index.html',
    'blog' => 'blog/index.html',
    'descargar' => 'descargar/index.html',
    'celebi' => 'celebi/index.html',
    'cookies' => 'cookies/index.html',
    'terminos' => 'terminos/index.html',
    'blog/neo-genesis-disponible' => 'blog/neo-genesis-disponible/index.html',
    'blog/legendary-collection-disponible' => 'blog/legendary-collection-disponible/index.html'
];

// Verificar si es un archivo estático (CSS, JS, imágenes)
if (preg_match('/\.(css|js|png|jpg|jpeg|gif|svg|ico|json)$/i', $path)) {
    return false; // Dejar que Apache maneje archivos estáticos
}

// Buscar la ruta
$file = null;
if (array_key_exists($path, $routes)) {
    $file = $routes[$path];
} elseif (file_exists($path . '/index.html')) {
    $file = $path . '/index.html';
} elseif (file_exists($path . '.html')) {
    $file = $path . '.html';
} else {
    $file = '404.html'; // Página de error
}

// Servir el archivo
if (file_exists($file)) {
    readfile($file);
} else {
    http_response_code(404);
    readfile('404.html');
}
?>