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

    $("#Eliminar").on('click', function(e) {
        deleteRow();
    });
    $("#Buscar").on('click', function(e) {
        buscarParaderoTabla();
    });
});

function buscarParaderoTabla() {
    var placa;
    if ($("#nombre").val() === "") {
        alert("Ingrese el nombre de un paradero");
        return;
    } else {
        placa = $("#nombre").val();
        $.post("../../../controlador/fachada.php", {
            clase: 'Paradero',
            metodo: 'buscarParaderoTabla',
            nombre: nombre
        }, function(data) {
            ProcesarDatos(data);
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


function deleteRow() {
    var id = "";
    try {
        var table = document.getElementById('tabla');
        var rowCount = table.rows.length;
        for (var i = 1; i < rowCount; i++) {
            var row = table.rows[i];
            var radiobutton = row.cells[2].childNodes[0];
            if (null != radiobutton && true == radiobutton.checked) {
                id = row.cells[0].innerText;
                table.deleteRow(i);
                rowCount--;
                i--;
                eliminar(id);
            }
        }
    } catch (e) {
        alert(e);
    }

}

function eliminar(id) {
    $.post("../../../controlador/fachada.php", {
        clase: 'Paradero',
        metodo: 'eliminarParadero',
        nombre: id
    }, function(data) {
        console.log(data);
    }, "json");
}

