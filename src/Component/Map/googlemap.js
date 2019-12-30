// import React, { Component } from 'react'
// import PropTypes from "prop-types";
// import {
//     Map,
//     TileLayer,
//     Marker,

   
//   } from 'react-leaflet'
//   import { Card} from 'reactstrap'
 
// class Maps  extends Component{
//     state={
        
//         lat:this.props.lat, 
//         log: this.props.log,
        
//         zoom: 8,
       

//     }
//     componentDidMount(){
//         // this.setState({lat: this.props.lat, log: this.props.lag})
//         console.log(this.state.lat, this.state.log)
//     }
//     render(){
//         const center = [this.state.lat, this.state.log];
//          const position= [this.state.lat, this.state.log]
       
//         return(
//             <Card className="able" hover bordered striped responsive size="sm">
//                 <Map center={center} zoom={this.state.zoom}>
//                     <TileLayer
//                     // attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//                     url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//                     />
//                     <Marker  position= {position}></Marker>
//                 </Map>
//             </Card>
//         )
//     }
// }
// export default Maps
// import React,{ useState } from 'react'
// import MapGL, {Marker } from 'react-map-gl'
// // import config from '../config'
// import 'mapbox-gl/dist/mapbox-gl.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
// const TOKEN="pk.eyJ1Ijoic2FuZGVlcGNoYW5kMTk5NiIsImEiOiJjazQ3OHR3YW4wcG5vM2RzZTczczMzMDF3In0.ZmPzFZkeckIOJWtDXxizrQ"

// // const geolocateStyle = {
// //   float: 'left',
// //   margin: '50px',
// //   padding: '10px'
// // };

// const Map = (props) => {

//   const [viewport, setViewport ] = useState({
//     width: "100%",
//     height: "100vh",
//     latitude: props.lat ,
//     longitude: props.log,
//     zoom: 15
//   })

  
//   return (
//     <MapGL {...viewport} mapboxApiAccessToken={TOKEN} onViewportChange={viewport => {
//         setViewport(viewport);
//       }} mapStyle="mapbox://styles/sandeepchand1996/ck479sxhl2ufq1cmrhy47twd0"> 
//       <Marker latitude={props.lat} longitude={props.log}>
//           <FontAwesomeIcon  icon= {faMapMarker}
//                   size="sm"
//                   color="red"></FontAwesomeIcon>
//         </Marker>
      
      

//     </MapGL>
//   )
// }

// export default Map
import React, { Component } from 'react';
import GoogleMapReact, { 
   Marker, GoogleApiWrapper } from 'google-maps-react';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'

class GoogleMaps extends Component {
  state={
   zoom: 15,
   center:{
   lat: this.props.lat,
   lng: this.props.log
   }

  }
    
  componentDidMount(){
     console.log(this.props.lat, this.state.lng)
  }
  componentDidCatch(){
    return this.props.history.push({pathname: '/base/tables'})
  }
  render() {
   
    return (
      <div style={{ height: '100vh', width: '150%' }}>
      <GoogleMapReact google={this.props.google}
      bootstrapURLKeys={{ key: "AIzaSyCT60FOMjGxPjOQjyk9ewP5l9VkmMcTWmE" }}
        defaultCenter={this.state.center}   
        defaultZoom={this.state.zoom}
      >
        <Marker position={{lat:this.state.center.lat, lng: this.state.center.lng}}>
        <FontAwesomeIcon  icon= {faMapMarker}
                  size="sm"
                  color="red"></FontAwesomeIcon>
        </Marker>
      </GoogleMapReact>
    </div>
    )
}
}
export default GoogleApiWrapper({
   apiKey: 'AIzaSyCT60FOMjGxPjOQjyk9ewP5l9VkmMcTWmE'
 })(GoogleMaps);
// export default GoogleMaps
// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
 
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 11
//   };
 
//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyCT60FOMjGxPjOQjyk9ewP5l9VkmMcTWmE' }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent
//             lat={59.955413}
//             lng={30.337844}
//             text="My Marker"
//           />
          
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }
 
// export default SimpleMap;