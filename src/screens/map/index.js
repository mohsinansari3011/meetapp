import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

//const providerx = firebase.provider;




class Mapscreen extends Component {


    constructor() {
        super();
        this.state = {
            currentuser: '',
            coords: null,
        };




        this.updateCoords = this.updateCoords.bind(this);
        this.submitDatatoFirestore = this.submitDatatoFirestore.bind(this)
    }




    setPosition() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ coords: position.coords })
        });
    }

    updateCoords({ latitude, longitude }) {
        this.setState({ coords: { latitude, longitude } })
    }


    componentDidMount() {

        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentuser: user });
                this.setPosition();
                //console.log(user.uid);
            } else {
                console.info('Must be authenticated');
                this.props.history.push('/');
            }
        });


    }

    


    getcords(){

        const { coords } = this.state;

        console.log(coords);
    }

    profileScreen4() {
        const { coords } = this.state;
        let Mapstyle = { 'textAlign': '-webkit-center', 'marginTop': '20px' }
        return (


            <div className="row">
                <div className="col-md-12" style={Mapstyle}>
                    <input style={{ width: `100%` }} className="btn btn-primary" type="button" value="submit" onClick={this.submitDatatoFirestore} />
                   </div>
                   
                    <div className="col-md-12" style={Mapstyle}>
                    
                {coords && <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJdeN0I2e7USVUmXotyl2hzgqKzdfHY1M&amp;v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `80%`, width: `100%` }} />}
                        containerElement={<div style={{ height: `80vh`, width: `100%` }} />}
                    mapElement={<div style={{ height: `80%`, width: `100%` }} />}
                    coords={coords}
                    updateCoords={this.updateCoords}
                />}

                
            </div>
            </div>

        );
    }





submitDatatoFirestore(){

    const { currentuser, coords } = this.state; 

    //console.log(currentuser.providerData.displayName);
    let displayname = "";
    let email = "";
    let puid = "";
    let pimage = "";

    currentuser.providerData.forEach(function (profile) {
        
        displayname = profile.displayName;
        email = profile.email;
        puid = profile.uid;
        pimage = profile.photoURL;
        })

    //console.log(currentuser.uid);

    const niname = localStorage.getItem("niname");
    const pnumber = localStorage.getItem("pnumber");
    const beveragess = localStorage.getItem("beverages");
    const durations = localStorage.getItem("duration");
    const image1 = localStorage.getItem("image1");
    const image2 = localStorage.getItem("image2");
    const image3 = localStorage.getItem("image3");

    const uid = currentuser.uid;
    
    try {

        const beverages = beveragess.split(',');
        const duration = durations.split(',');

        const latitude = coords.latitude;
        const longitude = coords.longitude;


        firebase.db.collection("tbluserprofile").add({ uid, email, displayname, puid, pimage, nickname: niname, phonenumber: pnumber, image1, image2, image3, beverages, duration, latitude, longitude })
            .then().catch(err => swal('There was an error:',err,"error"))

        //localStorage.setItem("dashboard","showmeeting");
        swal("Good Job!", "Successfully Updated", "success");
        this.props.history.push('/dashboard');


    } catch (error) {
        
        swal("Bad Job!", error, "error");
    }
    


}


    render(){


        return (<div>  
         {this.profileScreen4()}</div>)
    }


}


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown &&
            <Marker
                position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
                draggable={true}
                onDragEnd={position => {
                props.updateCoords({ latitude: position.latLng.lat(), longitude: position.latLng.lng() })
                }}
            />}
    </GoogleMap>
))


export default Mapscreen;