var marker;
var mapa;

function mostrarMapaOrigen(x, y) {
    var mapDiv = document.getElementById('mapaOrigen');
    var options = {
        center: new google.maps.LatLng(x, y),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    mapa = new google.maps.Map(mapDiv, options);
    marker = new google.maps.Marker({
        position: mapa.getCenter()
                , map: mapa
                , icon: '../img/marcador_origen.png'
                , draggable: true
    });
}

function mostrarMapaDestino(x, y) {
    var mapDiv = document.getElementById('mapaDestino');
    var options = {
        center: new google.maps.LatLng(x, y),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    mapa = new google.maps.Map(mapDiv, options);
    marker = new google.maps.Marker({
        position: mapa.getCenter()
                , map: mapa
                , icon: '../img/marcador_destino.png'
                , draggable: true
    });
}

function omitirAcentos(text) {
    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
}

//este método obtiene los parametros que se envian por método get
function getGET() {
    var loc = document.location.href;
    var getString = loc.split('?')[1];
    if (getString != null) {
        var GET = getString.split('&');
        var get = {};//this object will be filled with the key-value pairs and returned.

        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
    else
        return "";
}

function mostrarParaderos(titulo, latitud, longitud) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitud, longitud)
                , map: mapa
                , title: titulo
                , icon: 'img/icono_paradero.png'
                , draggable: true

    });
}
