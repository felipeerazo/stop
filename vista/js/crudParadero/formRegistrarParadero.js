/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$().ready(function() {
    $("#registrarParadero").on('click', function(e) {
        if ($("#nombre").val() === "" || $("#longitud").val() === "" || $("#latitud").val() === "") {
            alert("Ingrese todos los datos");
            return;
        }
        else {            
            var nombre = $("#nombre").val();
            var longitud = $("#longitud").val();
            var latitud = $("#latitud").val();
            $.post("../../../controlador/fachada.php", {
                clase: 'Paradero',
                metodo: 'insertarParadero',
                nombre: nombre,
                longitud: longitud,
                latitud: latitud
            }, function(data) {
                console.log(data);
            }, "json");
        }
        e.preventDefault();
    }
    );

});









