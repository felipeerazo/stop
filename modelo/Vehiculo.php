<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Vehiculo
 *
 * @author Felipe
 */
class Vehiculo {
    
    var $db = null;

    function __construct() {
        require_once("Conexion.php");
        $this->db = new Conexion();
    }
    
    function getVehiculo($argumentos){
        extract($argumentos);
        $sql = utf8_encode("CALL obtener_vehiculo($rut_id);");
        $consulta=$this->db->execute_procedure($sql);
        $res[]=null;
        $i=0;
        while ($fila =mysql_fetch_array($consulta)){
            $res[$i]=$fila;            
            $i++;
        }
        echo json_encode($res);
    }
    
    
     function insertarVehiculo($argumentos){
        extract($argumentos);        
        $sql = utf8_encode("CALL insertar_vehiculo('$placa', $numeropuestos, $empresa);");
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
