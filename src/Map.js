import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherChecked: this.props.venues,
    };
  }

  state = {
    makerList : []
  }

  componentDidMount= () => {
    window.initMap = this.initMap;
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDHLg6xJt1-ED_9YY_WuR-MOIDSCih_jg4&v=3&callback=initMap";
    script.async = true;
    document.body.appendChild(script);
  }

  componentWillUpdate = (nextProps, nextState) => {
    if(window.google && nextProps !== this.props) {
      this.clearAllThePleaces();
      this.displayPleaces();
    }
  }

  clearAllThePleaces= () => {
    if(this.state.makerList) {
      for (var i = 0; i < this.state.makerList.length; i++ ) {
        this.state.makerList[i].setMap(null);
      }
    };

    this.setState(
      {
        makerList:[]
      });

  }



displayPleaces= () => {
  var map = window.map;
  var markers = [];
  const google=window.google;

  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  var locations = this.props.venues;
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = {
      lat: locations[i].location.lat,
      lng: locations[i].location.lng
    };
    var title = locations[i].name;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    bounds.extend(markers[i].position);
  }

  // this.setState({
  //   pleaces :this.state.venues.filter((v) => match.test(v.name))
  // });

  this.setState(
    {
      makerList:markers
    }
  );
  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);

  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }
  }

}

initMap= ()=> {
  const google=window.google;
  window.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: 13
  });
  this.displayPleaces();

}


render() {

  function handleClick(e)  {
    e.preventDefault();
    document.querySelector('#sidebar').classList.toggle('active');
    console.log('The link was clicked.');
  }

  return (
      <div>
      <div id='title'>
      <button onClick={handleClick} type="button" id="sidebarCollapse" className="btn btn-info navbar-btn">
      Toggle Sidebar
    </button>
      </div>

      <div id='map'>
      </div>
      </div>

  );


}
}

export default Map;
