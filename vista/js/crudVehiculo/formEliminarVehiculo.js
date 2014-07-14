/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$().ready(function() {
    $.post("../../../controlador/fachada.php", {
        clase: 'Vehiculo',
        metodo: 'getListaVehiculo',
        placa: ''
    }, function(data) {
        ProcesarDatos(data);
    }, "json");

    $("#Eliminar").on('click', function(e) {
        deleteRow();
    });
    $("#Buscar").on('click', function(e) {
        buscarVehiculoTabla();
    });
});

function buscarVehiculoTabla() {
    var placa;
    if ($("#placa").val() === "") {
        alert("Ingrese una placa");
        return;
    } else {
        placa = $("#placa").val();
        $.post("../../../controlador/fachada.php", {
            clase: 'Vehiculo',
            metodo: 'buscarVehiculoTabla',
            placa: placa
        }, function(data) {
            ProcesarDatos(data);
        }, "json");
    }
}


function ProcesarDatos(data) {
    var res = '<tr><th>Placa</th><th>Empresa</th><th>Marcar</th></tr>';
    $.each(data, function(i, fila) {
        res = res + '<tr data-valor= ' + fila["veh_placa"] + ' class="click"><td>' + fila["veh_placa"] + '</td><td>' + fila["emp_nombre"] + '</td> <td><input type="radio" name="radiobutton"/></td></tr>';
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
        clase: 'Vehiculo',
        metodo: 'eliminarVehiculo',
        placa: id
    }, function(data) {
        console.log(data);
    }, "json");
}