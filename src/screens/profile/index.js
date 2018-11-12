import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
import coffeeimg from '../../images/coffee.png'
import juiceimg from '../../images/juice.png'
import cocktailimg from '../../images/cocktail.png'
import profileimg from '../../images/profileimg.jpg'
import { Link } from "react-router-dom";



class ProfileScreen extends Component {


    constructor() {
        super();
        this.state = {
            nickname: '',
            phonenumber: '',
            image1: profileimg,
            image2: profileimg,
            image3: profileimg,
            beverages: [],
            duration: [],
        };



        this.updateProfile = this.updateProfile.bind(this);
    
    }


componentDidMount(){

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            this.setState({ currentuser: user });
            firebase.db.collection("tbluserprofile").where("uid", "==", user.uid).get()
                .then((query) => {
                    query.forEach((doc) => {
                        this.setState({ userdata: doc.data(),
                        docid : doc.id,
                        nickname : doc.data().nickname,
                        phonenumber: doc.data().phonenumber,                        
                        image1 : doc.data().image1,
                        image2: doc.data().image2,
                        image3: doc.data().image3,
                        beverages : doc.data().beverages,
                        duration : doc.data().duration
                    });

                        
                        this.checkBeaverages();
                    });
                })

        } else {
            console.info('Must be authenticated');
            this.props.history.push('/');
        }
    });


   

}



updateProfile(){

    const { docid, nickname, phonenumber, image1, image2, image3, beverages, duration} = this.state;

    try {
        firebase.db.collection("tbluserprofile").doc(docid).update({

            nickname,
            phonenumber,
            image1,
            image2,
            image3,
            beverages,
            duration

        });

        swal("Good job!", "Profile has been updated", "success");

    } catch (error) {
        swal("Bad job!", error , "error");
    }
   

}


checkBeaverages(){

    const {beverages , duration } = this.state;

    if (beverages.length > 0) {
        for (const item of beverages) {
            if (item === "Coffee") {
                document.getElementById("cbcoffee").checked = true;
            }
            if (item === "Juice") {
                document.getElementById("cbjuice").checked = true;
            }
            if (item === "Cocktail") {
                document.getElementById("cbcocktail").checked = true;
            }
        }
    }

    if (duration.length > 0) {
        for (const item of duration) {
            if (item === "20") {
                document.getElementById("cb20").checked = true;
            }
            if (item === "60") {
                document.getElementById("cb60").checked = true;
            }
            if (item === "120") {
                document.getElementById("cb120").checked = true;
            }
        }
    }
}

    handlenickname(e) {
        //const {nickname} = this.state;
        const niname = e.target.value;
        this.setState({
            nickname: niname,
        })

        //localStorage.setItem("niname", e.target.value);
    }


    handlephone(e) {
        //const { phonenumber } = this.state;
        const pnumber = e.target.value;
        this.setState({
            phonenumber: pnumber,
        })

        //localStorage.setItem("pnumber", e.target.value);
    }

    clickfile(e) {

        this.setState({
            currentimage: e.target.id,
        })

        if (document.getElementById('fileInput1')) {
            document.getElementById('fileInput1').click();
        }
    }


    changefile(e) {

        const { currentimage } = this.state;
        var imgpath = '';
        if (e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgpath = e.target.result;
                document.getElementById(currentimage).setAttribute('src', e.target.result)

                if (currentimage === "image1") {
                    this.setState({ image1 : imgpath });
                }
                if (currentimage === "image2") {
                    this.setState({ image2: imgpath });
                }
                if (currentimage === "image3") {
                    this.setState({ image3: imgpath });
                }
                //localStorage.setItem(currentimage, imgpath)
            };



            reader.readAsDataURL(e.target.files[0]);
        }
    }



    selectbeverages(e) {

        const { beverages } = this.state;

        console.log("value  ", e.target.value);
        if (e.target.checked) {
            beverages.push(e.target.value);
        } else {
            var index = beverages.indexOf(e.target.value);
            if (index > -1) {
                beverages.splice(index, 1);
            }
        }

        this.setState({
            beverages,
        })
        //console.log(beverages);

        //localStorage.setItem("beverages", beverages);

        
    }


    selectduration(e) {

        const { duration } = this.state;

        //console.log("value  ", e.target.value);
        if (e.target.checked) {
            duration.push(e.target.value);
        } else {
            var index = duration.indexOf(e.target.value);
            if (index > -1) {
                duration.splice(index, 1);
            }
        }

        this.setState({
            duration,
        })
        //console.log("JSON.stringify(duration)   ",JSON.stringify(duration));

        //localStorage.setItem("duration", duration);

      
    }





    render() {

        return (<div> 

            <h1>My Profile</h1>
            <label>NickName : </label>
            <input type="text" className="form-control" value={this.state.nickname} onChange={this.handlenickname.bind(this)} placeholder="nickname" />
            <label>Phone : </label>
            <input type="number" className="form-control" value={this.state.phonenumber} onChange={this.handlephone.bind(this)} placeholder="phone number" />
            

            <h3>Select Images</h3>

            <div className="col-md-12">

                <input onChange={this.changefile.bind(this)} id="fileInput1" type="file" style={{ display: "none", }} />

                <div className="col-md-4">
                    <img id="image1" alt="picutre" src={this.state.image1}
                        className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
                </div>
                <div className="col-md-4">
                    <img id="image2" alt="picutre" src={this.state.image2}
                        className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
                </div>
                <div className="col-md-4">
                    <img id="image3" alt="picutre" src={this.state.image3}
                        className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
                </div>
            </div>



            <h3>Select Beverages</h3>
            <img alt="Coffee" src={coffeeimg} height="25px" width="25px" />
            <input type="checkbox" onChange={this.selectbeverages.bind(this)} value="Coffee" id="cbcoffee" /> <label htmlFor="cbcoffee">Coffee</label>

            <img alt="Juice" src={juiceimg} height="25px" width="25px" />
            <input type="checkbox" onChange={this.selectbeverages.bind(this)} value="Juice" id="cbjuice" /><label htmlFor="cbjuice">Juice</label>

            <img alt="Cocktail" src={cocktailimg} height="25px" width="25px" />
            <input type="checkbox" onChange={this.selectbeverages.bind(this)} value="Cocktail" id="cbcocktail" /><label htmlFor="cbcocktail">Cocktail</label>


            <br />
            <h3>Select Duration of Meeting</h3>

            <input type="checkbox" onChange={this.selectduration.bind(this)} value="20" id="cb20" /> <label htmlFor="cb20">20 Min </label>
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="60" id="cb60" /> <label htmlFor="cb60">60 Min </label>
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="120" id="cb120" /> <label htmlFor="cb120">120 Min </label>

            <br />
                
            <button className="btn btn-primary" onClick={this.updateProfile} >Update Profile</button>
            <Link to="/dashboard"> <input className="btn btn-primary" type="button" value="back" /> </Link>
                 </div>)
    }

}


export default ProfileScreen;