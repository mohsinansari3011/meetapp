import React, { Component } from 'react';
//import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
// import coffeeimg from '../../images/coffee.png'
// import juiceimg from '../../images/juice.png'
// import cocktailimg from '../../images/cocktail.png'
// import profileimg from '../../images/profileimg.jpg'
import { Link } from "react-router-dom";
import { Notification } from "react-web-notification";





firebase.db.collection("tblusermeetings").where("status", "==", "PENDING").orderBy("creationtime", "desc")
    .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {

                
                
                console.log("New matchername: ", change.doc.data().matchername);
            }
        });
    });


    
class Dashboard extends Component {


    
    constructor() {
        super();
        this.state = {
            currentuser: '',
            currentuserRecord : '',
            ignore: true,
            title: ''
        };

      
       
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



    


    handlePermissionGranted() {
        console.log('Permission Granted');
        this.setState({
            ignore: false
        });
    }
    handlePermissionDenied() {
        console.log('Permission Denied');
        this.setState({
            ignore: true
        });
    }
    handleNotSupported() {
        console.log('Web Notification not Supported');
        this.setState({
            ignore: true
        });
    }

    handleNotificationOnClick(e, tag) {
        console.log(e, 'Notification clicked tag:' + tag);
    }

    handleNotificationOnError(e, tag) {
        console.log(e, 'Notification error tag:' + tag);
    }

    handleNotificationOnClose(e, tag) {
        console.log(e, 'Notification closed tag:' + tag);
    }

    handleNotificationOnShow(e, tag) {
        this.playSound();
        console.log(e, 'Notification shown tag:' + tag);
    }
    handleButtonClick() {

        if (this.state.ignore) {
            return;
        }

        const now = Date.now();

        const title = 'React-Web-Notification' + now;
        const body = 'Hello' + new Date();
        const tag = now;
        const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
        // const icon = 'http://localhost:3000/Notifications_button_24.png';

        // Available options
        // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
        const options = {
            tag: tag,
            body: body,
            icon: icon,
            lang: 'en',
            dir: 'ltr',
            //sound: './sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
        }
        this.setState({
            title: title,
            options: options
        });
    }


    render() {
      
        const { currentuser } = this.state;
        let styles = { width: "-webkit-fill-available" }
        return (<div> <h1> Dashboard </h1>
            <button onClick={this.handleButtonClick.bind(this)}>Notif!</button>
           
            <Notification
                ignore={this.state.ignore && this.state.title !== ''}
                notSupported={this.handleNotSupported.bind(this)}
                onPermissionGranted={this.handlePermissionGranted.bind(this)}
                onPermissionDenied={this.handlePermissionDenied.bind(this)}
                onShow={this.handleNotificationOnShow.bind(this)}
                onClick={this.handleNotificationOnClick.bind(this)}
                onClose={this.handleNotificationOnClose.bind(this)}
                onError={this.handleNotificationOnError.bind(this)}
                timeout={5000}
                title={this.state.title}
                options={this.state.options}
            />

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