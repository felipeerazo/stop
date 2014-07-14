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

    $("#Confirmar").on('click', function(e) {
        mostrarCamposActualizar();
    });
    $("#Buscar").on('click', function(e) {
        buscarVehiculoTabla();
    });
    $("#btnValidarVehiculo").on('click', function(e) {
        if ($("#placa").val() === "" || $("#numeropuestos").val() === "") {
            alert("Ingrese ambos datos");
            return;
        }
        else {
            var empresa = $("#empresa").val();
            convertirIdEmpresa(empresa);
        }
    }
    );
    $("#Actualizar").on('click', function(e) {
        var placaMod = $("#placaMod").val();
        var puestos = $("#puestos").val();
        var idEmpresa = $("#empresaId").val();
        $.post("../../../controlador/fachada.php", {
            clase: 'Vehiculo',
            metodo: 'actualizarVehiculo',
            placa: placaMod,
            puestos: puestos,
            empresa: idEmpresa
        }, function(data) {
            console.log(data);
        }, "json");
    }
    );
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
            ProcesarDatos()(data);
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
                buscarVehiculo(id.toString());
            }
        }
    } catch (e) {
        alert(e);
    }
}

function buscarVehiculo(placa) {     
      $.post("../../../controlador/fachada.php", {
        clase: 'Vehiculo',
        metodo: 'buscarRegistroVehiculo',
        placa: placa
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
    $("#divActualizarVehiculo").html(res);
}


function actualizar(id) {
    $.post("../../../controlador/fachada.php", {
        clase: 'Vehiculo',
        metodo: 'actualizarVehiculo',
        placa: id
    }, function(data) {
        console.log(data);
    }, "json");
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

