/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$().ready(function() {
    $.post("../../../controlador/fachada.php", {
        clase: 'Paradero',
        metodo: 'getListaParadero',
        placa: ''
    }, function(data) {
        ProcesarDatos(data);
    }, "json");

    $("#Confirmar").on('click', function(e) {
        mostrarCamposActualizar();
    });
    $("#Buscar").on('click', function(e) {
        buscarParaderoTabla();
    });
    
    $("#Actualizar").on('click', function(e) {
        var nombre = $("#nombre").val();
        var longitud = $("#longitud").val();
        var latitud = $("#latitud").val();
        $.post("../../../controlador/fachada.php", {
            clase: 'Paradero',
            metodo: 'actualizarParadero',
            nombre: nombre,
            longitud: longitud,
            latitud: latitud
        }, function(data) {
            console.log(data);
        }, "json");
    }
    );
});

function buscarVehiculoTabla() {
    var nombre;
    if ($("#nombre").val() === "") {
        alert("Ingrese el nombre de un paradero");
        return;
    } else {
        nombre = $("#nombre").val();
        $.post("../../../controlador/fachada.php", {
            clase: 'Paradero',
            metodo: 'buscarParaderoTabla',
            nombre: nombre
        }, function(data) {
            ProcesarDatos()(data);
        }, "json");
    }
}


function ProcesarDatos(data) {
    var res = '<tr><th>Nombre</th><th>Longitud</th><th>Latitud</th></tr>';
    $.each(data, function(i, fila) {
        res = res + '<tr data-valor= ' + fila["par_nombre"] + ' class="click"><td>' + fila["par_nombre"] + '</td><td>' + fila["par_longitud"] + '</td><td>' + fila["par_latitud"] + '</td> <td><input type="radio" name="radiobutton"/></td></tr>';
    });
    $("#tabla").html(res);
}


function mostrarCamposActualizar() {
    var id = "";
    try {
        var table = document.getElementById('tabla');
        var rowCount = table.rows.length;
        for (var i = 1; i < rowCount; i++) {
            var row = table.rows[i];
            var radiobutton = row.cells[2].childNodes[0];
            if (null != radiobutton && true == radiobutton.checked) {
                id = row.cells[0].innerText;
                busquedaParadero(id.toString());
            }
        }
    } catch (e) {
        alert(e);
    }
}

function actualizar(id) {
    $.post("../../../controlador/fachada.php", {
        clase: 'Paradero',
        metodo: 'actualizarParadero',
        nombre: id
    }, function(data) {
        console.log(data);
    }, "json");
}


function busquedaParadero(nombre) {     
    $.post("../../../controlador/fachada.php", {
            clase: 'Paradero',
            metodo: 'buscarRegistroParadero',
            nombre: nombre.toString()
        }, function(data) {
        alert('data: '+data);
        camposActualizar(data);
    }, "json");

}

function camposActualizar(data) {
    var res;
    $.each(data, function(i, fila) {
        res = 'Número de Puestos:<input type="hidden" value=' + fila["veh_placa"] + ' id="puestos" name="puestos" /> <input type="text" value=' + fila["veh_puestos"] + ' id="puestos" name="puestos" /> <br> Empresa: <input type="text" value=' + fila["veh_empresa"] + ' id="empresa" name="empresa" /><br><input class="btn btn-lg btn-block boton" value="Validar" type="button" id="btnValidarVehiculo"/><br><input class="btn btn-lg btn-block boton" value="Actualizar" type="button" id="Actualizar"/>';
    });
    $("#divActualizarParadero").html(res);
}