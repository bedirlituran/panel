<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$dataFile = __DIR__ . "/../../data/requests.json";

// JSON fayl mövcud deyilsə, yaradılır
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([]));
}

function readData($file) {
    $content = file_get_contents($file);
    return json_decode($content, true) ?: [];
}

function writeData($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$action = $_GET['action'] ?? '';

switch ($action) {
    // 🟩 Siyahını qaytar
    case 'list':
        echo json_encode(readData($dataFile));
        break;

    // 🟩 Yeni müraciət əlavə et
    case 'add':
        $input = json_decode(file_get_contents("php://input"), true);
        $data = readData($dataFile);

        $new = [
            "id" => count($data) + 1,
            "tip" => $input["tip"] ?? "",
            "ad" => $input["ad"] ?? "",
            "telefon" => $input["telefon"] ?? "",
            "unvan" => $input["unvan"] ?? "",
            "bina" => $input["bina"] ?? "",
            "menzil" => $input["menzil"] ?? "",
            "paket" => $input["paket"] ?? "",
            "nov" => $input["nov"] ?? "",
            "suret" => $input["suret"] ?? "",
            "texnik" => $input["texnik"] ?? "",
            "menbe" => $input["menbe"] ?? "",
            "tarix" => $input["tarix"] ?? "",
            "saat" => $input["saat"] ?? "",
            "qeyd" => $input["qeyd"] ?? "",
            "status" => "Gözləmədə"
        ];

        $data[] = $new;
        writeData($dataFile, $data);
        echo json_encode(["success" => true, "message" => "Əlavə edildi"]);
        break;

    // 🟩 Status yenilə
    case 'update':
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input["id"] ?? 0;
        $newStatus = $input["status"] ?? "";

        $data = readData($dataFile);
        foreach ($data as &$item) {
            if ($item["id"] == $id) {
                $item["status"] = $newStatus;
                break;
            }
        }
        writeData($dataFile, $data);
        echo json_encode(["success" => true, "message" => "Status yeniləndi"]);
        break;

    // 🟩 Müraciəti sil
    case 'delete':
        $id = $_GET["id"] ?? 0;
        $data = readData($dataFile);
        $data = array_values(array_filter($data, fn($i) => $i["id"] != $id));
        writeData($dataFile, $data);
        echo json_encode(["success" => true, "message" => "Silindi"]);
        break;

    default:
        echo json_encode(["error" => "Yanlış əməliyyat"]);
        break;
}
