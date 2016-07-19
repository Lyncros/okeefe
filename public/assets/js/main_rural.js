function initMap() {
    var map;
    var ico_marc = 'assets/img/marcador_1.png'
    map = new google.maps.Map(document.getElementById('mapa-home'), {
        center: {lat: -34.7156697, lng: -58.2854728},
        zoom: 16
    });

    var marcador = new google.maps.Marker({
        position: {lat: -34.7156697, lng: -58.2854728},
        map: map,
        title: "Inmobiliaria O'keefe",
        icon: ico_marc
    });
}

$( document ).ready(function() {
    $('#enlace_reg').click(function(){
        $('#modal-login').modal('hide');
        $('#modal-registro').modal('show');
    });

    $('#enlace_ing').click(function(){
        $('#modal-registro').modal('hide');
        $('#modal-login').modal('show');
    });
    // Switches
    if ($('[data-toggle="switch"]').length) {
        $('[data-toggle="switch"]').bootstrapSwitch({
            onColor: 'normal',
            offColor: 'default'
        });
    }
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});