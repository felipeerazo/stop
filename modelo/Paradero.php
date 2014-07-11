<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Paradero
 *
 * @author Felipe
 */
class Paradero {
    
    var $db = null;

    function __construct() {
        require_once("Conexion.php");
        $this->db = new Conexion();
    }
    
    function getParaderos($argumentos){
        extract($argumentos);
        $sql = utf8_encode("CALL listar_paraderos($rut_id);");
        $consulta=$this->db->execute_procedure($sql);
        $res[]=null;
        $i=0;
        while ($fila =mysql_fetch_array($consulta)){
            $res[$i]=$fila;            
            $i++;
        }
        echo json_encode($res);
    }
    
}

?>
