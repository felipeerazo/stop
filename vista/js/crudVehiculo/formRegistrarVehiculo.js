/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$().ready(function() {
    //$("#boton").on('click', function(e) {        
    $.post("../../../controlador/fachada.php", {
        clase: 'Empresa',
        metodo: 'getListaEmpresas',
        param: ''
    }, function(data) {
        ProcesarDatos(data);
    }, "json");
//        e.preventDefault();
//    });
});


function ProcesarDatos(data) {
    var res = '<option selected>------ Empresa ------</option>';
    $.each(data, function(i, fila) {
        res = res + '<option>' + fila["emp_nombre"] + '<\option>';
    });
    $("#empresa").html(res);
}