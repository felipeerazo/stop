/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$().ready(function() {
    var parametrosGet = getVarsUrl();
    $("#capa").html(parametrosGet.txtCategoria);
    $.post("../../controlador/fachada.php", {
        clase: 'Sitio_Interes',
        metodo: 'getListaSitioInteres',
        param: parametrosGet.txtCategoria
    }, function(data) {
        ProcesarDatos(data);
    }, "json");
});

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

function ProcesarDatos(data) {
    var res = '';
    $.each(data, function(i, fila) {
        res = res + '<li><a href="como_llego.html?txtLongitud=' + fila["2"] + '&txtLatitud=' + fila["3"] + '"><span class="icon"><img src="../img/' + fila["7"] + '.png"></span><span>' + fila["1"] + '</span></a></li>';
    });
    $("#listaSitiosInteres").html(res);
    //MostrarVentana("ventanaRutas");
}