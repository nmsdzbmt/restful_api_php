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

        //show data
        public function show(){
            $query = "SELECT * FROM cauhoi WHERE id=? LIMIT 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->id);
            $stmt->execute();
            
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->title = $row['title'];
            $this->cau_a = $row['cau_a'];
            $this->cau_b = $row['cau_b'];
            $this->cau_c = $row['cau_c'];
            $this->cau_d = $row['cau_d'];
            $this->cau_dung = $row['cau_dung'];
        }
    }
?>
