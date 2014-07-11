<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Categoria
 *
 * @author Felipe
 */
class Categoria {

    //put your code here
    var $db = null;

    function __construct() {
        require_once("Conexion.php");
        $this->db = new Conexion();
    }

    function getListaCategorias($argumentos) {
        extract($argumentos);
        $sql = utf8_encode("CALL listar_categorias();");
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
