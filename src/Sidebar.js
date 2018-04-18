import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    var venues = this.props.venues;
    return (
        <nav id='sidebar'>
        <input className='input-group-text' onChange={this.props.updatePlaces}/>
        <ol>
        {Array.isArray(venues)&&
         venues.map(v => {
           return <li key={v.id}>{v.name}</li>;
         })
        }
      </ol>
        </nav>
    );
  }
}

export default Sidebar;
