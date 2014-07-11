
var latitud, longitud,repeticion;

$().ready(function() {
    $("#START").on('click', function(e) {
        repeticion=window.setInterval("obtenerAutom()",5000);
        e.preventDefault();
    });
    $("#STOP").on('click', function(e) {
        window.clearInterval(repeticion);
        e.preventDefault();
    });
});

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
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    $.post("../../controlador/fachada.php", {
        clase: 'WebServices',
        metodo: 'ActualizarUbicacionBus',
        placa: 'DPP-33D',
        latitud: latitud,
        longitud: longitud
    }, function(data) {

    }, "json");
}