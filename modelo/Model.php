<?php

class Model {

    var $db = null;

    function Model() {
        require_once("Connection.php");
        $this->db = new Connection();
    }

    function guardar($nom, $ape, $doc, $email, $ciudad, $cel, $id) {
        $response = "";
        $sql = utf8_encode("CALL registraUsuario($ciudad,'$nom','$ape','$doc','$email','$cel','$id')");
        $consulta = $this->db->execute_proc($sql, 2);
        $resultado = (mysqli_fetch_array($consulta));
        if ($resultado["res"] == 1) {
            $response = "1";
        } else {
            $response = "0";
        }
        echo $response;
    }

    function buscarCiudad() {
        $response = "";
        $sql = utf8_encode("CALL buscaCiudad()");
        $consulta = $this->db->execute_proc($sql, 2);
        while ($resultado = (mysqli_fetch_array($consulta))) {
            $response .= "<option value=\"" . $resultado["id_ciudad"] . "\">" . utf8_encode($resultado["ciudad"]) . "</option>";
        }
        echo $response;
    }

    function buscarUsuarioRegistrado($idFB) {
        $response = "";
        $sql = utf8_encode("CALL buscaUsuarioRegistrado('$idFB')");
        $consulta = $this->db->execute_proc($sql, 2);
        $resultado = (mysqli_fetch_array($consulta));
        $response = $resultado["res"];
        return $response;
    }

    function buscarPuntajeActual($idFB) {
        $response = "";
        $sql = utf8_encode("CALL buscarPuntajeActualInscripcion('$idFB')");
        $consulta = $this->db->execute_proc($sql, 2);
        $resultado = (mysqli_fetch_array($consulta));
        $response = $resultado["res"];
        $response = (strlen($response) > 1) ? $response : "0" . "" . $response;
        return $response;
    }

    function buscarPregunta($idFB) {
        $sql = utf8_encode("CALL buscaPregunta('$idFB')");
        $consulta = $this->db->execute_proc($sql, 2);
        $response = "";
        $yaRespondio = "";
	$opc="-1";
        while ($resultado = (mysqli_fetch_array($consulta))) {
            if ($response == "") {
		@$opc = $resultado["res"];
//die($opc);
                if(($opc == "1" || $opc == "0") && ($opc != "")){
                    //$yaRespondio = '<br /><span class="message">Ya has respondido el día de hoy.</span><br /><br /><img class="img_link" tittle="Continuar" onclick="location.href=\'perfil.php?ref=1\'" src="../resources/images/continuar_home.png" width="90px" />';
			$yaRespondio = "<script type='text/javascript'>location.href='perfil.php?ref=".$opc."'</script>";
                    break;
                }
                $response = "<input type='hidden' id='id_question_hide' value='" . $resultado["id_pregunta"] . "' /><span class='question'>" . utf8_encode($resultado["pregunta"]) . "</span><br />";
                $response .= "<div style='padding-top: 4px; float: left;'><select id='sel_request' style='float:left; marginlright: 4px;'>";
            }
            $response .= "<option value=\"" . utf8_encode($resultado["id_opcion"]) . "\">" . utf8_encode($resultado["opcion"]) . "</option>";
        }
        if ($response != "") {
            $response .= "</select><img style='margin-left: 5px; cursor: pointer;' title='Enviar' onclick='send_request();' src='../resources/images/send_button.png' alt='Enviar' /></div>";
        }else{
            $response = $yaRespondio;
        }
        echo $response;
    }

    function guardarRespuesta($idQue, $idReq, $id) {
        $response = "";
        $sql = utf8_encode("CALL guardaRespuesta($idQue,$idReq,'$id')");
        $consulta = $this->db->execute_proc($sql, 2);
        $resultado = (mysqli_fetch_array($consulta));
        $response = $resultado["puntajeFinal"];
        echo $response;
    }

    function buscarUltimaInvitacion($idFB) {
        $response = "";
        $sql = utf8_encode("CALL buscaFechaUltimaInvitacionAmigos('$idFB')");
        $consulta = $this->db->execute_proc($sql, 2);
        $resultado = (mysqli_fetch_array($consulta));
        $response = $resultado["res"];
        $response = ($response > 0) ? 1 : 0;
        return $response;
    }

    function guardarPuntajeInvitacion($id) {
        $response = "";
        $sql = utf8_encode("CALL guardaPuntajeInvitacionAmigos('$id')");
        $consulta = $this->db->execute_proc($sql, 2);
        $resultado = (mysqli_fetch_array($consulta));
        $response = $resultado["puntajeFinal"];
        echo $response;
    }
}
?>

