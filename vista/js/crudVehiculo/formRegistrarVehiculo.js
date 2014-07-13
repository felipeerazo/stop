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
        cmbEmpresa(data);
    }, "json");

    $.post("../../../controlador/fachada.php", {
        clase: 'Ruta',
        metodo: 'getListarRutas',
        param: ''
    }, function(data) {
        cmbRuta(data);
    }, "json");

    $("#btnValidarVehiculo").on('click', function(e) {
        if ($("#placa").val() === "" || $("#numeropuestos").val() === "") {
            alert("Ingrese ambos datos");
            return;
        }
        else {

            var empresa = $("#empresa").val();
            convertirIdEmpresa(empresa);           
            //alert($("#empresaId").val());
            // alert("placa:" + placa + ";numP: " + numeropuestos + ";empresa: " + empresa + ";idEmpresa: " + idEmpresa);
        }
    }
    );
    $("#btnRegistrarVehiculo").on('click', function(e) {
        if ($("#placa").val() === "" || $("#numeropuestos").val() === "") {
            alert("Ingrese ambos datos");
            return;
        }
        else {
            if ($("#placa").val() === "" || $("#numeropuestos").val() === "") {
                alert("Ingrese ambos datos");
                return;
            }
            var placa = $("#placa").val();
            var numeropuestos = $("#numeropuestos").val();
            var idEmpresa = $("#empresaId").val();
           // alert($(idEmpresa).val());
         // alert("placa:" + placa + ";numP: " + numeropuestos + ";empresa: " + empresa + ";idEmpresa: " + idEmpresa);
            $.post("../../../controlador/fachada.php", {
                clase: 'Vehiculo',
                metodo: 'insertarVehiculo',
                placa: placa,
                numeropuestos: numeropuestos,
                empresa: idEmpresa
            }, function(data) {
                console.log(data);
            }, "json");
        }
        e.preventDefault();
    }
    );

});


function cmbEmpresa(data) {
    var res = '<option selected>------ Empresa ------</option>';
    $.each(data, function(i, fila) {
        res = res + '<option>' + fila["emp_nombre"] + '</option>';
    });
    $("#empresa").html(res);
}


function cmbRuta(data) {
    var res = '<option selected>------ Ruta ------</option>';
    $.each(data, function(i, fila) {
        res = res + '<option>' + fila["rut_nombre"] + '</option>';
    });
    $("#ruta").html(res);
}


function convertirIdEmpresa(nombre) {
    var empresa;
    $.post("../../../controlador/fachada.php", {
        clase: 'Empresa',
        metodo: 'getIdEmpresa',
        param: nombre
    }, function(data) {
        $.each(data, function(i, fila) {

            empresa = fila["0"];

        });
        convertIdEmpresa(empresa);
    }, "json");
}

function convertIdEmpresa(data) {
    var res = "<input";
    res = res + " id=\"empresaId\" type=\"hidden\" value=\"" + data + "\"";
    res = res + ">";
    $("#divIdEmpresa").html(res);
}

function obtenerEmpresa() {
    $("#empresaId").val()

}





