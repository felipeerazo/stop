/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
    console.log('1');
    $("#index_comollego").on('click', function(e) { // para verlo funcionar debe estar desactivada la instrucciÃ³n de "eventClick"        
        $.post("controlador/fachada.php", {
            clase: 'HistorialVehiculo',
            oper: 'getListaCategorias',
            nombre: 'felipe'
        }, function(data) {
            console.log(data);
        }, "json");
        e.preventDefault();
    });

    $("#index_sitios").on('click', function(e) { // para verlo funcionar debe estar desactivada la instrucciÃ³n de "eventClick"
        $.post("controlador/fachada.php", {
            clase: 'HistorialVehiculo',
            oper: 'getListaRutas'
        }, function(data) {
            console.log(data);
            
            
        }, "json");
        e.preventDefault();
    });
});
