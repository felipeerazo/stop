<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UbicacionBusDAO
 *
 * @author Felipe
 */
class UbicacionBusDAO {

    private $placa;
    private $latitud;
            private$longitud;

    public function __construct() {
        
    }

    public function getPlaca() {
        return $this->placa;
    }

    public function getLatitud() {
        return $this->latitud;
    }

    public function getLongitud() {
        return $this->longitud;
    }

    public function setPlaca($placa) {
        $this->placa = $placa;
    }

    public function setLatitud($latitud) {
        $this->latitud = $latitud;
    }

    public function setLongitud($longitud) {
        $this->longitud = $longitud;
    }

}

?>
