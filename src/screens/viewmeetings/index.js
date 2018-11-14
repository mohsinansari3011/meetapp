import React, { Component } from 'react';
//import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
// import { Link } from "react-router-dom";
//import accepting from "../../images/accept.png"
//import rejecting from "../../images/deny.png"
//import defaultimg from '../../images/default.jpg'

// import coffeeimg from '../../images/coffee.png'
// import juiceimg from '../../images/juice.png'
// import cocktailimg from '../../images/cocktail.png'
// import profileimg from '../../images/profileimg.jpg'
// import AddToCalendar from 'react-add-to-calendar'
//import { Card, CardWrapper } from 'react-swipeable-cards';




class ViewMeetings extends Component {



    constructor() {
        super();
        this.state = {

            currentuser: '',
            meetinglist: false,
            list: [],
           
        };

      
    }



    componentDidMount() {

        firebase.auth.onAuthStateChanged(user => {

            //const { currentuser } = this.state;
            // console.log(user);
            if (user) {
                var meetingArray = [];
                firebase.db.collection("tbluserprofile").get()
                    .then((query) => {
                        if (query) {
                            query.forEach((doc) => {
                                meetingArray.push(doc.data());
                            });
                        }

                        if (meetingArray) {
                            this.setState({ meetData: meetingArray, meetinglist: true });
                            //console.log(meetingArray);
                        }


                    })

            }


        });
    }




    






    render() {

       
        return (<div> this is ViewMeetings
            
        </div>);
    }

}
export default ViewMeetings;