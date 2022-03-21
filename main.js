function myFunction(id){
    document.getElementById(id).classList.toggle("show");
}

window.onload = function () {
    document.body.classList.add('loaded');
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
        var layer = map.layers.get(0).get(0);
        waitForTilesLoad(layer).then(function() {
        document.body.classList.remove('loaded_hiding');
        });
    }
});

function getTileContainer(layer) {
    for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
            if (
                layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
            ) {
                return layer[k];
            }
        }
    }
    return null;
}

function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        var tc = getTileContainer(layer), readyAll = true;
        tc.tiles.each(function (tile, number) {
            if (!tile.isReady()) {
                readyAll = false;
            }
        });
        if (readyAll) {
            resolve();
        } else {
            tc.events.once("ready", function() {
                resolve();
            });
        }
    });
}