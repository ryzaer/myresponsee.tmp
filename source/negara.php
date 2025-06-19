<?php
$term = strtolower($_GET['term']);
$data = [
  ["id" => 1, "label" => "Indonesia", "img" => "https://flagcdn.com/w40/id.png"],
  ["id" => 2, "label" => "Malaysia", "img" => "https://flagcdn.com/w40/my.png"],
  ["id" => 3, "label" => "Thailand", "img" => "https://flagcdn.com/w40/th.png"],
  ["id" => 4, "label" => "Vietnam", "img" => "https://flagcdn.com/w40/vn.png"]
];
$result = array_filter($data, function($item) use ($term) {
  return strpos(strtolower($item['label']), $term) !== false;
});
echo json_encode(array_values($result));
