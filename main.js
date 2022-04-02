var date_1 = new Date();

function dropdown(id){
    document.getElementById(id).classList.toggle("show");
}

function show_content(href){
    var a = fetch(href)
   .then(promiseResult => {
      console.log(promiseResult)
      return promiseResult.text();
   })
   .then(responseResult => {
      console.log(responseResult)
      document.getElementById('changable').innerHTML =responseResult;
   })
}
 
function for_map(){
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
            document.body.classList.add('loaded_hiding');
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
}

function for_time(){
    var time = setInterval(function() {
    var date_2 = new Date();
    var res= new Date(date_2-date_1-10800000);
    var hours = res.getHours();
    var minutes = res.getMinutes();
    var seconds=res.getSeconds();

    if (hours<10) hours = "0" + hours;
    if (minutes<10) minutes = "0" + minutes;
    if (seconds<10) seconds = "0" + seconds;

    var res2 = ""+ hours + ":" + minutes + ":" + seconds;
    document.getElementById("time").innerHTML = res2;
    })
}