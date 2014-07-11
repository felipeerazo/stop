/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$().ready(function() {
    //$("#boton").on('click', function(e) {        
    $.post("../../controlador/fachada.php", {
        clase: 'Categoria',
        metodo: 'getListaCategorias',
        param: ''
    }, function(data) {
        ProcesarDatos(data);
    }, "json");
//        e.preventDefault();
//    });
});


function ProcesarDatos(data) {
    var res = '';
    $.each(data, function(i, fila) {
        res = res + '<li><a href="sitio_interes_sitio.html?txtCategoria=' + fila["1"] + '"\><span class="icon"><img src="../img/' + fila["2"] + '.png"></span><span>' + fila["1"] + '</span></a></li>';
    });
    $("#listaCategorias").html(res);
    //MostrarVentana("ventanaRutas");
}
