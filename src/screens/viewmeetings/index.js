import React, { Component } from 'react';
//import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
// import { Link } from "react-router-dom";
//import accepting from "../../images/accept.png"
//import rejecting from "../../images/deny.png"
import defaultimg from '../../images/default.jpg'

// import coffeeimg from '../../images/coffee.png'
// import juiceimg from '../../images/juice.png'
// import cocktailimg from '../../images/cocktail.png'
// import profileimg from '../../images/profileimg.jpg'
 import AddToCalendar from 'react-add-to-calendar'
//import { Card, CardWrapper } from 'react-swipeable-cards';




class ViewMeetings extends Component {



    constructor() {
        super();
        this.state = {

            currentuser: '',
            meetinglist: false,
            list: [],
            booluserMeeting : false,
        };

      
    }



    componentDidMount() {

        firebase.auth.onAuthStateChanged(user => {

            //const { currentuser } = this.state;
            // console.log(user);
            if (user) {
                var userMeeting = [];
                firebase.db.collection("tblusermeetings").where("useruid", "==", user.uid).get()
                    .then((query) => {
                        query.forEach((doc) => {
                            userMeeting.push(doc.data());
                        })
                        this.setState({ userMeeting, booluserMeeting: true });
                        //console.log(userMeeting, " after");
                    })


            }


        });
    }




    setUserMeeting() {

        const { userMeeting } = this.state;



        let icon = { 'calendar-plus-o': 'left' };

        let items = [{ outlook: 'Outlook' },
        { outlookcom: 'Outlook.com' },
        { apple: 'Apple Calendar' },
        { yahoo: 'Yahoo' },
        { google: 'Google' }
        ];




        return (userMeeting.map((data, i) => {

            let event = {
                title: "Meeting B/W " + data.matchername + " and " + data.userdname,
                description: 'This is the Reminder For Meeting event Orginized by MeetoApp',
                location: data.venue,
                startTime: data.date,
                endTime: data.date
            };

            return (<div key={i} className="col-md-4">
                <div className="gallery">
                    <img src={defaultimg} alt="DefultImage" width="300" height="200" />
                    <div className="desc">{data.matchername} <br />
                        {data.venue}<br />
                        {data.userdname}<br />
                        {data.meetingstatus}<br />

                        <AddToCalendar className="btn btn-primary" event={event} buttonLabel="Put on my calendar" buttonTemplate={icon} listItems={items} />
                    </div>
                </div>

            </div>);
        })


        );
        //this.setState({ booluserMeeting: true })


    }






    render() {

       
        const { booluserMeeting } = this.state
        //console.log(booluserMeeting, " booluserMeeting");
        return (<div> this is ViewMeetings <br/>
            {booluserMeeting && this.setUserMeeting()}
        </div>);
    }

}
export default ViewMeetings;