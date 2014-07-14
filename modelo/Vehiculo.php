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
    
    function eliminarVehiculo($argumentos){
        extract($argumentos);        
        $sql = utf8_encode("CALL eliminar_vehiculo('$placa');");
        $consulta=$this->db->execute_procedure($sql);
        $res[]=null;
        $i=0;
        while ($fila =mysql_fetch_array($consulta)){
            $res[$i]=$fila;            
            $i++;
        }
        echo json_encode($res);
    }
    
    function getListaVehiculo($argumentos){
        extract($argumentos);        
        $sql = utf8_encode("CALL mostrar_vehiculos();");
        $consulta=$this->db->execute_procedure($sql);
        $res[]=null;
        $i=0;
        while ($fila =mysql_fetch_array($consulta)){
            $res[$i]=$fila;            
            $i++;
        }
        echo json_encode($res);
    }
    
    
  
    
    function buscarVehiculoTabla($argumentos){
        extract($argumentos);        
        $sql = utf8_encode("CALL buscar_vehiculo_tabla('$placa');");
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


function actualizarVehiculo($argumentos){
        extract($argumentos);        
        $sql = utf8_encode("CALL actualizar_vehiculo('$placa', $puestos, $empresa);");
        $consulta=$this->db->execute_procedure($sql);
        $res[]=null;
        $i=0;
        while ($fila =mysql_fetch_array($consulta)){
            $res[$i]=$fila;            
            $i++;
        }
        echo json_encode($res);
    }
    
      function buscarRegistroVehiculo($argumentos){
        extract($argumentos);        
        $sql = utf8_encode("CALL buscar_registro_vehiculo('$placa');");
        $consulta=$this->db->execute_procedure($sql);
        $res[]=null;
        $i=0;
        while ($fila =mysql_fetch_array($consulta)){
            $res[$i]=$fila;            
            $i++;
        }
        echo json_encode($res);
    }

?>
