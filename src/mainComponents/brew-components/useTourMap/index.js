import React, { Component } from 'react';
import firebase from '../../../firebaseConfig';
import DisplayMap from './DisplayMap';
import swal from '@sweetalert/with-react';



class OtherMap extends React.PureComponent {
  constructor(){
    super();

    this.state = {
   
    }
  }

  getBrewsInDB = () => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(async(user) =>{
      console.log(user.uid, '<----- userrrr')
      let doc = 'UserData-' + user.uid
      console.log(doc, 'doc')
      await db.collection(doc).orderBy('timestamp',"asc")
        .onSnapshot(async(result) => {
          let array = [];
          await result.forEach((item, index) => {
            console.log(item.data(), 'created/MIRZA')
            array.push(item.data());
          })
          await this.setState({
            brewsFromDB: array
          })
  
        })
  
    })
  };

  getBrewsInDB = () => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(async(user) =>{
      console.log(user.uid, '<----- userrrr')
      let doc = 'UserData-' + user.uid
      console.log(doc, 'doc')
      await db.collection(doc).orderBy('timestamp',"asc")
        .onSnapshot(async(result) => {
          let array = [];
          await result.forEach((item, index) => {
            console.log(item.data(), 'created/MIRZA')
            array.push(item.data());
          })
          await this.setState({
            brewsFromDB: array
          })
  
        })
  
    })
  };

  componentDidMount() {
    this.getBrewsInDB();
  }

  onHover = (name, address, opening_hours, photos, rating, website) => {

    this.setState({
      breweryName: name,
      breweryAddress: address,
      breweryOpening_hours: opening_hours,
      breweryPhotos: photos,
      breweryRating: rating,
      breweryWebsite: website,
      showBrewery: true
    })
    console.log(this.state)
  }
 
  render(){

    let height = window.innerHeight - 20 + 'px';

    const showBrewery = () => {
      let index = 0;
      return(
        <div>
          <p>{this.state.breweryName}</p>
          <p>{this.state.breweryAddress}</p>
          <p>{this.state.breweryRating}</p>
          <a href={this.state.breweryWebsite} target="_blank">{this.state.breweryWebsite}</a> <br/>
          <img width='500' src={this.state.breweryPhotos[index]}/>
        </div>
      );
    }
    return (
      <div style={{height: height, marginTop: '-.6%', display: 'flex'}}>
        <h1>HELLLLLLLOOOOOOOO</h1>
        {/* {this.state.brews ? <DisplayMap brews={this.state.brews} />: null} */}

        <div style={{height: '95%',width: '100%',fontWeight: 'bold' , display: 'flex', flexDirection: 'column'}} >
          <div  className='map' style={{height: '100%'}}>
            {this.state.brewsFromDB ? <DisplayMap/> : null}
          </div>

          <div className='brewery' style={{height: '100%', display: 'flex', color:'black'}}>
            {
              this.state.brewsFromDB ? this.state.brewsFromDB.map((item, i) => (
                <div
                  name='mirza'
                  onMouseEnter={() => this.onHover(item.name, item.address, item.opening_hours, item.photos, item.rating, item.website)}
                  style={{width: '100%', border: '1px solid black',background:'white' }}
                >
                  <span style={{color:'red'}}>{i+1}</span>
                  <p>{item.name}</p>
                </div>
              )) : null
            }
          </div>
        </div>

        <div style={{height: '95%',width: '100%', color:'black'}}>
            <h2 style={{marginTop:'10%'}}>{this.state.showBrewery ? showBrewery() : null}</h2>
            <div>
              <h1>{this.state.breweryName}</h1>
              <h3>{this.state.breweryAddress}</h3>
              <h3><span style={{fontWeight: 'bold'}}>Rating:</span> {this.state.breweryRating}</h3>
              <h3><a href={this.state.breweryWebsite} target="_blank">{this.state.breweryWebsite}</a></h3> <br/>
            </div>
        </div>
      </div>
      ) 
  }
}

export default OtherMap;
