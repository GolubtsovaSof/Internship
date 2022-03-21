function myFunction(id){
    document.getElementById(id).classList.toggle("show");
}

ymaps.ready(function () {
    var map;
    ymaps.geolocation.get().then(function (res) {
        var mapContainer = $('#map'),
            bounds = res.geoObjects.get(0).properties.get('boundedBy'),
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            );
        createMap(mapState);
        res.geoObjects.options.set('preset', 'islands#redCircleIcon');
        map.geoObjects.add(res.geoObjects);
    });
    function createMap (state) {
        map = new ymaps.Map('map', state);
    }
});

