<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$dataFile = __DIR__ . "/data/data.json";
$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input["id"])) {
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

$existing = json_decode(file_get_contents($dataFile), true);
$filtered = array_filter($existing, fn($i) => $i["id"] !== $input["id"]);

file_put_contents($dataFile, json_encode(array_values($filtered), JSON_PRETTY_PRINT));
echo json_encode(["success" => true]);
?>
