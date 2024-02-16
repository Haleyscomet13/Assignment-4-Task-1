require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/symbols/PictureMarkerSymbol",
  "dojo/domReady!"
], function(Map, MapView, FeatureLayer, PictureMarkerSymbol) {

  var map = new Map({
    basemap: "gray" // Change to a lighter basemap, for example "gray"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-90.1994, 38.6270], // St. Louis coordinates
    zoom: 10
  });

  // Define the popup template for St. Louis neighborhoods
  var template = {
    title: "{NHD_NAME}",
    content: [{
      type: "fields",
      fieldInfos: [
        { fieldName: "NHD_NAME", label: "Neighborhood Name", visible: true },
        { fieldName: "NHD_NUM", label: "Neighborhood Number", visible: true}
      ]
    }]
  };

  // Define the symbol for the feature layer renderer
  var symbol = {
    type: "picture-marker",
    url: "https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Home-House--1024.png",
    width: "15px",
    height: "15px"
  };

  // Create the renderer
  var renderer = {
    type: "simple",
    symbol: symbol
  };

  // Create the feature layer with the St. Louis neighborhoods data
  var featureLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/STL_Neighborhood/FeatureServer/0",
    outFields: ["NHD_NAME", "POPULATION",],
    popupTemplate: template,
    renderer: renderer
  });

  // Add the feature layer to the map
  map.add(featureLayer);
});
