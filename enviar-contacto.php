<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contacto');
    exit;
}

// Honeypot: si un bot llena este campo oculto, fingimos éxito y no enviamos nada.
if (!empty($_POST['web'])) {
    header('Location: /contacto?enviado=1');
    exit;
}

function limpiar($valor) {
    $valor = trim($valor);
    return str_replace(["\r", "\n"], ' ', $valor);
}

$nombre = limpiar($_POST['nombre'] ?? '');
$contacto = limpiar($_POST['contacto'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');

if ($nombre === '' || $contacto === '' || $mensaje === '') {
    header('Location: /contacto?enviado=0');
    exit;
}

$destinatario = 'ventas1@madermel.com';
$asunto = 'Nuevo mensaje desde madermel.com';
$cuerpo = "Nombre: {$nombre}\n" .
          "Contacto: {$contacto}\n\n" .
          "Mensaje:\n{$mensaje}\n";

$replyTo = filter_var($contacto, FILTER_VALIDATE_EMAIL) ? $contacto : $destinatario;

$cabeceras = "From: {$destinatario}\r\n" .
             "Reply-To: {$replyTo}\r\n" .
             "Content-Type: text/plain; charset=UTF-8";

$enviado = mail($destinatario, $asunto, $cuerpo, $cabeceras);

header('Location: /contacto?enviado=' . ($enviado ? '1' : '0'));
exit;
