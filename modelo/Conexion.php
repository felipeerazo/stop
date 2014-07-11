<?php

//
//error_reporting(E_ALL);
//ini_set('display_errors', '1');

class Conexion {

    private $conexion;

    public function __construct() {
        $db_host = "localhost";
        $db_usuario = "root";
        $db_password = "";
        $db_nombre = "stop";
        $this->conexion = mysql_connect($db_host, $db_usuario, $db_password) or die('No se pudo conectar: ' . mysql_error());
        mysql_select_db($db_nombre) or die(mysql_error());
    }

    public function ejecutar($sql) {
        $result_query = mysqli_query($this->conexion, $sql);
        if (!$result_query) {
            die('MySQL Error: ' . mysql_error());
        }
        return $result_query;
    }

    public function execute_procedure($query) {
        /* Ejecucion para consultar datos */
        $result_query = mysql_query($query, $this->conexion);
        if (!$result_query) {
            die('MySQL Error Procedure: ' . mysql_error());
        }
        return $result_query;
    }

}
?>  
