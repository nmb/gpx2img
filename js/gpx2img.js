const gpx2img = {
  mymap: null,
  myroute: null,
  routeData: null,
  points: null,

  initialize: function(){
    this.mymap = L.map('map');
    // see https://leaflet-extras.github.io/leaflet-providers/preview/
    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 50
    }).addTo(this.mymap);
    this.mymap.addControl(new L.Control.Fullscreen());
    L.control.locate().addTo(this.mymap);
  },


  drawTrack: function () {
    if(this.myroute){
      this.mymap.removeLayer(this.myroute)
    }
    document.getElementById("map").style.display = "";
    document.getElementById("downloadButton").style.display = "";
    this.myroute = L.polyline(this.points, { weight: 4, color: 'darkred' })
    this.myroute.addTo(this.mymap);
    // zoom the map to the polyline
    this.mymap.fitBounds(this.myroute.getBounds());
  },
  loadTrack: function (input) {

    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file)
    reader.onload = () => {
      let gpx = new gpxParser();
      try {
        gpx.parse(reader.result);
      }
      catch(e) {
        alert("Malformed URL.")
        return
      }
      document.getElementById("totalDistance").innerText = (gpx.tracks[0].distance.total / 1000).toFixed(3);
      document.getElementById("distanceDiv").style.display = ""

      const track = gpx.tracks[0]
      let coordinates = track.points.map(p => [p.lat, p.lon, p.ele]);
      let tolerance = 4
      let dataString = ""
      console.log("No of points: " + coordinates.length)
      // calculate simplified route with increasing tolerance 
      // until URL is short enough

      this.points = track.points.map(p => [p.lat, p.lon])
        this.drawTrack(track.points)
      }

  },
}

