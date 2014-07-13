
var latOrigen;
var lngOrigen;
var latDestino;
var lngDestino;

function MostrarVentana(elementId, functionOnClose) {
    $.fancybox({
        //'frameWidth': 600, 'frameHeight': 500,
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'showCloseButton': true,
        'href': '#' + elementId,
        'onClosed': function() {
            if (functionOnClose !== undefined) {
                eval(functionOnClose);
            }
        }});
    //$.fancybox.resize();
}

function Prueba() {
    alert("test");
}

function OcultarVentana() {
    if ($.fancybox !== undefined) {
        $.fancybox.close();
    }
}


$().ready(function() {
    $("#btnVerRutas").on('click', function(e) {
        if ($("#txtOrigen").val() === "" || $("#txtDestino").val() === "") {
            alert("Ingrese ambas direcciones");
            return;
        }
        $.post("../../controlador/fachada.php", {
            clase: 'Ruta',
            metodo: 'getListaRutas',
            latOrigen: latOrigen,
            lngOrigen: lngOrigen,
            latDestino: latDestino,
            lngDestino: lngDestino
        }, function(data) {
            ProcesarDatos(data);
        }, "json");
        e.preventDefault();
    });
    var parametrosGet = getVarsUrl();
    if (parametrosGet.txtLatitud != null && parametrosGet.txtLongitud != null) {
        latDestino = parametrosGet.txtLatitud;
        lngDestino = parametrosGet.txtLongitud;
        obtenerDireccion("#txtDestino", latDestino, lngDestino);
    }
});


function ProcesarDatos(data) {
    MostrarVentana('ventanaRutas');
    var res = "<ul>";
    $.each(data, function(i, fila) {
        res = res + "<li>"
                + '<a href="paraderos.html?rut_id='+fila["rut_id"]+'">'
                + "<strong>" + fila["rut_nombre"] + "</strong>"
                + "Hora de salida: " + fila["rut_horasalida"] + "."
                + " $" + fila["rut_precio"]
                + "</a>"
                + "</li>";
    });
    res = res + "</ul>";
    $("#list4").html(res);
    
}

function getVarsUrl() {
    var url = location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj = {};
    for (var i = 0; i < arrUrl.length; i++) {
        var x = arrUrl[i].split("=");
        urlObj[x[0]] = x[1];
    }
    return urlObj;
}

function obtenerDireccion(id, lat, lng) {
    $.getJSON(
            //URL del servidor de google para traducir junto con las coordenadas
            "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true",
            function(data) {
                $(id).attr('value', data.results[0].formatted_address);
            });
}

function obtenerDireccionOrigen() {
    var latLng = marker.getPosition().toString().replace('(', '');
    latLng = latLng.toString().replace(')', '');
    latOrigen = latLng.split(", ")[0];
    lngOrigen = latLng.split(", ")[1];
    obtenerDireccion("#txtOrigen", latOrigen, lngOrigen);
}

function obtenerDireccionDestino() {
    var latLng = marker.getPosition().toString().replace('(', '');
    latLng = latLng.toString().replace(')', '');
    latDestino = latLng.split(", ")[0];
    lngDestino = latLng.split(", ")[1];
    obtenerDireccion("#txtDestino", latDestino, lngDestino);
}

function obtenerAutom() {
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);
    }
    else {
        alert("La geolocalización no es soportada por el navegador.");
    }
}

function mostrarError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("La solicitud de geolocalización ha sido negada por el usuario.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La información de localización no está disponible.");
            break;
        case error.TIMEOUT:
            alert("El tiempo para solicitud de localización se ha agotado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Un error desconocido ha ocurrido.");
            break;
    }
}

function mostrarPosicion(position) {
    latOrigen=position.coords.latitude;
    lngOrigen=position.coords.longitude;
    $.getJSON(
            //URL del servidor de google para traducir junto con las coordenadas
            "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true",
            function(data) {
                //location.href = "como_llego.jsp?direccionOrigen=" + castearParaGet(data.results[0].formatted_address) + "&direccionDestino=" + castearParaGet(getGET().direccionDestino);
                //alert(data.results[0].formatted_address);
                $("#txtOrigen").attr('value', data.results[0].formatted_address);
            });
}