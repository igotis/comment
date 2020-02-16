<?php

// db connection
$dir = 'sqlite:comments.sqlite';
$pdo  = new PDO($dir) or die("cannot open the database");

$data = json_decode(file_get_contents('php://input'), true);

if(!isset($data['action'])){
    print json_encode([
        'code' => 400,
        'message' => 'There is no Action'
    ]);
    die();
}

if($data['action'] == 'index') {

    $query = "SELECT * FROM comments";
    $comments = $pdo->query($query);

    $comments = $comments->fetchAll(PDO::FETCH_ASSOC);

    print json_encode([
        'code' => 200,
        'message' => $comments,
    ]);
}elseif($data['action'] == 'create'){

    $statement = $pdo->prepare('INSERT INTO comments (name, comment, stat, parent_id, created_at)
    VALUES (:name, :comment, :stat, :parent_id, :created_at)');

    $comment = $data['comment'];

    $statement->execute([
        'name' => $comment['name'],
        'comment' => $comment['comment'],
        'stat' => $comment['stat'],
        'parent_id' => $comment['parentId'],
        'created_at' => $comment['time'],
    ]);

    var_dump($statement);

    print json_encode([
        'code' => 200,
        'message' => $statement,
    ]);
}
