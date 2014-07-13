<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Empresa
 *
 * @author Felipe
 */
class Empresa {
    //put your code here
    
    var $db = null;

    function __construct() {
        require_once("Conexion.php");
        $this->db = new Conexion();
    }

    function getListaEmpresas($argumentos) {
        extract($argumentos);
        $sql = utf8_encode("CALL listar_empresa();");
        $consulta=$this->db->execute_procedure($sql);
        $res[]=null;
        $i=0;
        while ($fila =mysql_fetch_array($consulta)){
            $res[$i]=$fila;            
            $i++;
        }
        echo json_encode($res); 
    }
    
    function getIdEmpresa($argumentos) {
        extract($argumentos);
        $sql = utf8_encode("CALL consultar_id_empresa_nombre('$param');");
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
