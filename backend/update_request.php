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
foreach ($existing as &$item) {
    if ($item["id"] === $input["id"]) {
        $item = $input;
        break;
    }
}

file_put_contents($dataFile, json_encode($existing, JSON_PRETTY_PRINT));
echo json_encode(["success" => true]);
?>
