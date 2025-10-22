<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// JSON şəklində gələn datanı oxuyuruq
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

// Sadə demo məlumatlar
$users = [
    ["email" => "admin@boss.az", "password" => "12345", "role" => "admin"],
    ["email" => "user@boss.az", "password" => "12345", "role" => "user"]
];

$response = ["success" => false, "message" => "Yanlış email və ya şifrə!"];

foreach ($users as $user) {
    if ($user["email"] === $email && $user["password"] === $password) {
        $response = [
            "success" => true,
            "role" => $user["role"],
            "message" => "Giriş uğurludur!"
        ];
        break;
    }
}

echo json_encode($response);
?>
