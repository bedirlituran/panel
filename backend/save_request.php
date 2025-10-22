<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$dataFile = __DIR__ . "/data/data.json";
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([]));
}

$existing = json_decode(file_get_contents($dataFile), true);
$existing[] = $input;

file_put_contents($dataFile, json_encode($existing, JSON_PRETTY_PRINT));
echo json_encode(["success" => true]);
?>
