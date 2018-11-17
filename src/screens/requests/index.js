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
// import AddToCalendar from 'react-add-to-calendar'
//import { Card, CardWrapper } from 'react-swipeable-cards';




class Requests extends Component {



    constructor() {
        super();
        this.state = {

            currentuser: '',
            rquestlist: false,
           // list: [],
            GetRequests : false,
        };

    
    }



    componentDidMount() {

        firebase.auth.onAuthStateChanged(user => {

            //const { currentuser } = this.state;
            // console.log(user);
            if (user) {
                var rquestlist = [];
                firebase.db.collection("tblusermeetings").where("matcheruid", "==", user.uid).get()
                    .then((query) => {
                        query.forEach((doc) => {
                            rquestlist.push(doc);
                            //console.log(doc.data());
                        })
                        this.setState({ rquestlist, GetRequests: true });
                        //console.log(userMeeting, " after");
                    })


            }


        });
    }


    confirmRequest(docid){


    console.log(docid);

        firebase.db.collection("tblusermeetings").doc(docid).update({ 
        status : "ACCEPTED",
            popup : true
     });

        


}

    setUseRequest() {

        const { rquestlist } = this.state;



       




        return (rquestlist.map((data, i) => {

            // console.log(dat.data());
            return (<div key={i} className="col-md-4">
                <div className="gallery">
                    <img src={defaultimg} alt="DefultImage" width="300" height="200" />
                    <div className="desc">
                    
                        Name :  {data.data().matchername} <br />
                        Vemeue :  {data.data().venue}<br />
                        Send Request by : {data.data().userdname}<br />
                        Duration 20Min<br />
                        Status : {data.data().status}<br />
                    </div>

                    <input value="Confirm Request" className="btn btn-primary" onClick={this.confirmRequest.bind(this , data.id)} />
              </div>

            </div>);
        })


        );
        //this.setState({ booluserMeeting: true })


    }






    render() {

       
        const { GetRequests } = this.state
        //console.log(booluserMeeting, " booluserMeeting");
        return (<div> this is ViewRequest <br/>
            {GetRequests && this.setUseRequest()}
        </div>);
    }

}
export default Requests;