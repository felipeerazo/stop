<?php

class WebServices {

    var $db = null;

    function __construct() {
        require_once("Conexion.php");
        $this->db = new Conexion();
    }

    function ActualizarUbicacionBus($argumentos) {
        extract($argumentos);
        $sql = utf8_encode("CALL actualizar_ubicacion_bus('" . $placa. "'," . $latitud. "," . $longitud. ")");
        $this->db->execute_procedure($sql);
        $res = mysql_affected_rows();
        echo json_encode($res);
    }

}

?>
