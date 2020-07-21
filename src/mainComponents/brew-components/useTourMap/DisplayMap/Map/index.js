import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Card, Button, Image } from 'semantic-ui-react';
import ReactDOM from "react-dom";
import swal from '@sweetalert/with-react';
import firebase from '../../../../../firebaseConfig';
import DirectionRenderComponent from './Directions';
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


const mapHeight = (window.innerHeight / 1.15) - 30 + 'px'; // Using this variable to measure the height of the map container all the way at the end of this code
class DisplayMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            brews: props.brews
        }
    }
  async componentDidMount() {
      const db = firebase.firestore();
      const currentUserUid = firebase.auth().currentUser.uid;
      await db.collection('UserTourData').where("userUid", "==", currentUserUid).get()
      .then(async(result) => {
        let array = [];
        await result.forEach((item, index) => {
          array.push(item.data());
        });
        let newArray = [];
        
        await array.forEach((item, index) => {
          if (index > 0 && !item.hasOwnProperty('size')) {
            newArray.push({
              from: array[index-1].position,
              to: item.position
            });
          }
        })
        
        await this.setState({
          brewTour: newArray
        })

      })
    }

    onMarkerClick = async (props, marker, e) => {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
          info: props
    
        });    
      }
    render () {
      return(
        <GoogleMap 
        defaultZoom={10}
        defaultCenter={{ lat: 30.3005, lng: -97.7388 }}
      >
          {
            this.state.brewTour ? this.state.brewTour.map((item, index) => {
              return (
                <DirectionRenderComponent
                  key={index}
                  index={index + 1}
                  strokeColor={'#000000'}
                  from={item.from}
                  to={item.to}
                />
            );
            }): null }            
      </GoogleMap>
    )
    }

}

   
      export default compose(
        withProps({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDRUpBESMbs6306QTg9QeIvQmbhApYl2Qw&v=3.exp&libraries=geometry,drawing,places",
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: mapHeight }} />,
          mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap
      )(DisplayMap);;