<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Resquested-With');

    include_once('../../config/db.php');
    include_once('../../model/question.php');
    
    $db = new db();
    $connect = $db->connect();
    $question = new Question($connect);

    $data = json_decode(file_get_contents("php://input"));

    $question->id = $data->id;
    $question->title = $data->title;
    $question->cau_a = $data->cau_a;
    $question->cau_b = $data->cau_b;
    $question->cau_c = $data->cau_c;
    $question->cau_d = $data->cau_d;
    $question->cau_dung = $data->cau_dung;

    if($question->update()){
        echo json_encode(array('messenger','Question updated'));
    }else{
        echo json_encode(array('messenger','Question updated error'));
    }
?>