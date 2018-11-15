import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
// import { Link } from "react-router-dom";
 import accepting from "../../images/accept.png"
 import rejecting from "../../images/deny.png"
 //import defaultimg from '../../images/default.jpg'

// import coffeeimg from '../../images/coffee.png'
// import juiceimg from '../../images/juice.png'
// import cocktailimg from '../../images/cocktail.png'
// import profileimg from '../../images/profileimg.jpg'
// import AddToCalendar from 'react-add-to-calendar'
 import { Card, CardWrapper } from 'react-swipeable-cards';




class MyEndCard extends Component {
    render() {
        return (
            <div>You Finished Swiping!</div>
        );
    }
}


class SetupMeeting extends Component {



    constructor() {
        super();
        this.state = {

            currentuser: '',
            meetinglist: false,
            list: [],
            meetData: [],
            booluserMeeting: false,
        };

        this.setMeetingListCards = this.setMeetingListCards.bind(this);
    }



componentDidMount(){

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
                    this.setState({ meetData: meetingArray, meetinglist: true, currentuser : user });
                    //console.log(meetingArray);
                }


            })

    }


    });
}



    // onSwipe(data, dat ) {
    //     console.log("I was swiped.", dat, data);
    // }

    onSwipeLeft(data) {
        //console.log("I was swiped left.");
    }

    onSwipeRight(displayname, uid) {
        //console.log("I was swiped right.", displayname);
        //swal("Meet", "Do you want to meet " + dat,"info")

        swal({
            title: "Lets Meet People here",
            text: "Do you want to meet " + displayname + " !!!!",
            icon: "info",
            buttons: ["No", "Yes"],

        })
            .then((isyes) => {
                if (isyes) {

                    // swal("Poof! Your Meeting has been fixed!", {
                    //     icon: "success",
                    // });

                    localStorage.setItem("matchername", displayname);
                    localStorage.setItem("matcheruid", uid);
                    this.props.history.push("/directions");
                    //this.setState({ showmapdirections : true});

                } else {
                    //swal("Your imaginary file is safe!");
                }
            });



    }

    onDoubleTap(data) {
        //console.log("I was double tapped.");
    }


    setMeetingListCards() {

        const { meetData, currentuser } = this.state;

        console.log(currentuser, " currentuser")
        //console.log(meetData," Meetdata");

        const ShowMeetingArray = meetData.map((doc) => {


            return (
                currentuser.uid !== doc.uid ?
                <Card
                    key={doc.uid}
                    //onSwipe={this.onSwipe.bind(this, doc.displayname)}
                    onSwipeLeft={this.onSwipeLeft.bind(this)}
                    onSwipeRight={this.onSwipeRight.bind(this, doc.displayname, doc.uid)}
                    onDoubleTap={this.onDoubleTap.bind(this)}>


                    <div className="gallery">
                        <img className="imggal" src={doc.image1} alt="5Terre" width="600" height="400" />
                        <div className="desc">
                            <div className="col-md-4 text-center"> <img src={rejecting} alt="check" width="25" height="25" /> </div>
                            <div className="col-md-4 text-center"> <p> {doc.displayname} <br /> {doc.email}</p> </div>
                            <div className="col-md-4 text-center"> <img src={accepting} alt="check" width="25" height="25" onClick={this.onSwipeRight.bind(this, doc.displayname, doc.uid)} /> </div>
                        </div>
                    </div>

                </Card>
                : <div></div>
            );




        });

        

        try {
            return (<div> <h1>Select a person for a Meeting!!</h1>
                <CardWrapper addEndCard={this.getEndCard.bind(this)}>
                    {ShowMeetingArray}
                </CardWrapper>   </div>);

        } catch (error) {
            console.log(error);
        }





    }
    


    getEndCard() {
        return (
            <MyEndCard />
        );
    }




    render() {

        const { meetinglist } = this.state
        //console.log(meetinglist, " meetinglist");
        return (<div> this is SetupMeeting  
            {meetinglist && this.setMeetingListCards()}
        </div>);
    }

}
export default SetupMeeting;