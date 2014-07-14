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

    function getParaderos($argumentos) {
        extract($argumentos);
        $sql = utf8_encode("CALL listar_paraderos($rut_id);");
        $consulta = $this->db->execute_procedure($sql);
        $res[] = null;
        $i = 0;
        while ($fila = mysql_fetch_array($consulta)) {
            $res[$i] = $fila;
            $i++;
        }
        echo json_encode($res);
    }

    function insertarParadero($argumentos) {
        extract($argumentos);
        $sqlmax = mysql_query('SELECT MAX(par_id)+1 FROM sto_paradero');
        $resul = -1;
        $k = 0;
        while ($ide = mysql_fetch_array($sqlmax)) {
            $resul = $ide[0];
            $k++;
        }
       $sql = utf8_encode("CALL insertar_paradero($resul,'$nombre', '$longitud', '$latitud');");
        $consulta = $this->db->execute_procedure($sql);
        $res[] = null;
        $i = 0;
        while ($fila = mysql_fetch_array($consulta)) {
            $res[$i] = $fila;
            $i++;
        }
        echo json_encode($res);
    }

}


function eliminarParadero($argumentos){
        extract($argumentos);        
        $sql = utf8_encode("CALL eliminar_paradero('$nombre');");
        $consulta=$this->db->execute_procedure($sql);
        $res[]=null;
        $i=0;
        while ($fila =mysql_fetch_array($consulta)){
            $res[$i]=$fila;            
            $i++;
        }
        echo json_encode($res);
    }
    
    function getListaParadero($argumentos){
        extract($argumentos);        
        $sql = utf8_encode("CALL mostrar_paraderos();");
        $consulta=$this->db->execute_procedure($sql);
        $res[]=null;
        $i=0;
        while ($fila =mysql_fetch_array($consulta)){
            $res[$i]=$fila;            
            $i++;
        }
        echo json_encode($res);
    }
    
      
    function buscarParaderoTabla($argumentos){
        extract($argumentos);        
        $sql = utf8_encode("CALL buscar_paradero_tabla('$nombre');");
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
