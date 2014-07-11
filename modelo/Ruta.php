<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HistorialVehiculo
 *
 * @author Felipe
 */
class Ruta {

    var $db = null;

    function __construct() {
        require_once("Conexion.php");
        $this->db = new Conexion();
    }

    function Test($param) {
        extract($param);
        echo json_encode("origenes: $origen, destino: $destino");
    }

    function getListaRutas($argumentos) {
        extract($argumentos);
        //$sql = utf8_encode("CALL listar_rutas('$origen', '$destino');");
        $sql = utf8_encode("CALL obtener_ruta($latOrigen,$lngOrigen,$latDestino,$lngDestino)");                
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
