import React, { Component } from 'react';
//import swal from 'sweetalert';
import swal from '@sweetalert/with-react';
import * as firebase from '../../config/firebase'
// import coffeeimg from '../../images/coffee.png'
// import juiceimg from '../../images/juice.png'
// import cocktailimg from '../../images/cocktail.png'
// import profileimg from '../../images/profileimg.jpg'
import { Link } from "react-router-dom";









const onPick = value => {
    swal("Thanks for your rating!", `You rated us ${value}/5`, "success")
}

const MoodButton = ({ rating, onClick }) => (
    <button
        data-rating={rating}
        className="mood-btn"
        onClick={() => onClick(rating)}
    />
)


    
class Dashboard extends Component {


    
    constructor() {
        super();
        this.state = {
            currentuser: '',
            currentuserRecord : '',
            ignore: true,
            title: ''
        };

      
        this.AskForRating = this.AskForRating.bind(this);
    }




    componentDidMount() {
       

        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                
                //console.log(user.uid, " user Undef");
                
                firebase.db.collection("tbluserprofile").where("uid", "==", user.uid).get()
                        .then((query) => {

                            if (!query.empty) {
                               // console.log(query.empty, " NotEmpty");
                                query.forEach((doc) => {
                                    this.setState({ currentuserRecord: doc.data(), currentuser: user })
                                })

                            }else{
                                //console.log(query.empty, " Empty");
                                //console.log(" props", this.props)
                                this.props.history.push('/setprofile');
                            }
                               
                        })
                
                //console.log(user.uid, " user Undef");
               

            } else {
                console.info('Must be authenticated');
                this.props.history.push('/');
            }
        });






    }


AskForRating(){
   
}


    PostMeetingPopup(currentuser){

        firebase.db.collection("tblusermeetings").where("status", "==", "PENDING").orderBy("creationtime", "desc")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {

                    // console.log("New matchername1: ", change.doc.data().matchername);
                    // console.log("New matcheruid1: ", change.doc.data().matcheruid);
                    // console.log("New useruid1: ", change.doc.data().useruid);
                    // console.log("New currentuser.uid: ", currentuser.uid);

                    if (change.type === "added") {

                        if (change.doc.data().matcheruid === currentuser.uid || change.doc.data().useruid === currentuser.uid) {
                            //console.log("New matchername: ", change.doc.data().matchername);

                            let GivenDate = change.doc.data().date;
                            let CurrentDate = new Date();
                            GivenDate = new Date(GivenDate);

                            if (CurrentDate > GivenDate) {

                                swal({
                                    title: "Meeting",
                                    text: "Was the meeting successful?",
                                    icon: "info",
                                    buttons: ["No", "Yes"],
                                })
                                    .then((isyes) => {
                                        if (isyes) {

                                            swal({
                                                text: "How was your experience getting help with this issue?",
                                                buttons: {
                                                    cancel: "Close",
                                                },
                                                content: (
                                                    <div>
                                                        <MoodButton
                                                            rating={1}
                                                            onClick={onPick}
                                                        />
                                                        <MoodButton
                                                            rating={2}
                                                            onClick={onPick}
                                                        />
                                                        <MoodButton
                                                            rating={3}
                                                            onClick={onPick}
                                                        />
                                                        <MoodButton
                                                            rating={4}
                                                            onClick={onPick}
                                                        />
                                                        <MoodButton
                                                            rating={5}
                                                            onClick={onPick}
                                                        />
                                                    </div>
                                                )
                                            })

                                        } else {
                                            swal("Your imaginary file is safe!");
                                        }
                                    });


                                console.log('Given date is not greater than the current date.');
                            } else {
                                console.log('Given date is  greater than the current date.');
                            }
                        }


                    }
                });
            });
    }




    render() {
        const { currentuser } = this.state;

        if (currentuser) {
            this.PostMeetingPopup(currentuser);
        }

        
        let styles = { width: "-webkit-fill-available" }
        return (<div> <h1> Dashboard </h1>
            

            {currentuser ? <div className="col-md-12">
                {currentuser.providerData.map((user, index) => {
                    return (<b key={index}> Welcome {user.displayName}</b>)
                }
                )}
                <Link to="/profile"> <input style={styles} className="btn btn-primary" type="button" value="Update Profile" /> </Link> </div> : <div></div>
            }
            <br />
            <div className="col-md-12">
                <Link to="/setupmeeting">  <input style={styles} className="btn btn-primary" type="button" value="Set up a New Meeting" /> </Link>
            </div> <br/> <div className="col-md-12">
                <Link to="/viewmeetings"> <input style={styles} className="btn btn-primary" type="button" value="View Meetings" /> </Link>
            </div>

            </div>);
    }




}
export default Dashboard;