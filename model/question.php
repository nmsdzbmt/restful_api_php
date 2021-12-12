<?php
    class Question{
        private $conn;

        //question
        public $id;
        public $title;
        public $cau_a;
        public $cau_b;
        public $cau_c;
        public $cau_d;
        public $cau_dung;

        //connect database
        public function __construct($db)
        {
            $this->conn = $db;
        }

        //read data
        public function read(){
            $query = "SELECT * FROM cauhoi ORDER BY id DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }
    }
?>
