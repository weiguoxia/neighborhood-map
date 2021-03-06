import React, { Component } from 'react';
import Map from "./Map";
import Sidebar from "./Sidebar";
import escapeRegExp from 'escape-string-regexp';
import DocumentMeta from 'react-document-meta';


class App extends Component {
  state = {
    venues:{},
    pleaces:{}
  };

  updatePlaces = (query) => {
    query = query.target.value;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState({
        pleaces :this.state.venues.filter((v) => match.test(v.name))
      });
    } else {
      this.setState({
        pleaces :this.state.venues
      });
    }
  }

  componentDidMount= () => {
    fetch('https://api.foursquare.com/v2/venues/search?ll=40.7484,-73.9857&limit=5&oauth_token=WFHCWFMQ2ZB51ZH1O3WVPZYD25QSZLSYFGAR4UEJLJW5G2FG&v=20180329')
      .then(function(response) {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          venues :myJson.response.venues,
          pleaces : myJson.response.venues
        });
      });
  }

  render() {
    const meta = {
      // name: "viewport",
      // content: 'width=device-width, initial-scale=1'
    };
    return (
      <DocumentMeta {...meta}>
        <div  className='container-fluid'>
          <Sidebar id='sidebar' venues={this.state.pleaces} updatePlaces={this.updatePlaces}/>
          <Map id='google-map'venues={this.state.pleaces} />
        </div>
      </DocumentMeta>

    );
  }
}

export default App;
