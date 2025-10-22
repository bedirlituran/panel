<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$dataFile = __DIR__ . "/data/data.json";

if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([]));
}

echo file_get_contents($dataFile);
?>
