<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Sitio_Interes
 *
 * @author Felipe
 */
class Sitio_Interes {

    var $db = null;

    public function __construct() {
        require_once("Conexion.php");
        $this->db = new Conexion();
    }

    function getListaSitioInteres($argumentos) {
        extract($argumentos);
        $sql = utf8_encode("CALL listar_sitio_interes('$param');");
        $consulta = $this->db->execute_procedure($sql);
        $res[] = null;
        $i = 0;
        while ($fila = mysql_fetch_array($consulta)) {
            //die(json_encode(mysql_num_rows($consulta)));        
            //echo json_encode(mysql_fetch_array($result)); 
            $res[$i] = $fila;
            $i++;
        }
        echo json_encode($res);
    }

}

?>
