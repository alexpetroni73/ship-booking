var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHBldHJvbmkiLCJhIjoiY2tiaHhwZzE3MDhtZDJ3bXllaHYzcW94MiJ9.ZP6uYXewa4munj4Up_Hqvg';
// var map = new mapboxgl.Map({
// container: 'YOUR_CONTAINER_ELEMENT_ID',
// style: 'mapbox://styles/mapbox/streets-v11'
// });

function createMap (container, lng = 108, lat = 22) {

  return new mapboxgl.Map({
  container: container,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lng, lat], // starting position [lng, lat]
  zoom: 3 // starting zoom
  });
}

function createMarker (lng, lat) {
  return new mapboxgl.Marker().setLngLat([lng, lat])
}

export {
  createMap,
  createMarker,
}
