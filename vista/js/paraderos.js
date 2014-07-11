
var mapa, repeticion, markerVehiculo, parametrosGet;

$().ready(function() {
    mostrarMapa(5.0622453, -75.5071972);
    parametrosGet = getVarsUrl();
    $.post("../../controlador/fachada.php", {
        clase: 'Paradero',
        metodo: 'getParaderos',
        rut_id: parametrosGet.rut_id
    }, function(data) {
        procesarParaderos(data);
    }, "json");

    $("#START").on('click', function(e) {
        //iniciarVehiculo();        

        repeticion = window.setInterval("iniciarVehiculo()", 5000);
        e.preventDefault();
    });
    $("#STOP").on('click', function(e) {
        window.clearInterval(repeticion);
        e.preventDefault();
    });
});

function iniciarVehiculo() {
    if (markerVehiculo != null) {
        markerVehiculo.setMap(null);
    }
    $.post("../../controlador/fachada.php", {
        clase: 'Vehiculo',
        metodo: 'getVehiculo',
        rut_id: parametrosGet.rut_id
    }, function(data) {
        procesarVehiculo(data);
    }, "json");
}

function mostrarMapa(lat, lng) {
    var mapDiv = document.getElementById('mapa');
    var options = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    mapa = new google.maps.Map(mapDiv, options);
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

function procesarParaderos(data) {
    $.each(data, function(i, fila) {
        agregarParadero(fila["par_latitud"], fila["par_longitud"], fila["par_nombre"]);
    });
}

function agregarParadero(lat, lng, contenido) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng)
                , map: mapa
                , icon: '../img/icono_paradero.png'
    });

    var popup = new google.maps.InfoWindow({
        content: '<div id="contenido">' + contenido + '</div>'
    });

    google.maps.event.addListener(marker, 'click', function() {
        popup.open(mapa, marker);
    });
}

function procesarVehiculo(data) {
    $.each(data, function(i, fila) {
        agregarVehiculo(fila["his_latitud"], fila["his_longitud"], fila["veh_placa"]);
    });
}

function agregarVehiculo(lat, lng, contenido) {
    markerVehiculo = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng)
                , map: mapa
                , icon: '../img/stop_icon_verde.png'
    });
    var popup = new google.maps.InfoWindow({
        content: '<div id="contenido">' + contenido + '</div>'
    });
    google.maps.event.addListener(markerVehiculo, 'click', function() {
        popup.open(mapa, markerVehiculo);
    });
//    markerVehiculo.borrar = function() {
//        this.position.map = null;
//    };
}