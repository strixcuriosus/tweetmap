google.maps.event.addDomListener(window, 'load', function(){
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(37.7749300, -122.4194200),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var socket = io.connect('http://localhost:8080');

  socket.on('tweet', function(data) {
    if (data.geo) {
      var location = new google.maps.LatLng(data.geo.coordinates[0], data.geo.coordinates[1]);

      var infoWindow = new google.maps.InfoWindow({
        content: data.place.name
      });
      
      var marker = new google.maps.Marker({
        position: location,
        title: "Client Geolocation",
        animation: google.maps.Animation.DROP,
        draggable: true
      });
      
      marker.setMap(map);
    }
  });
});
console.log('yo');