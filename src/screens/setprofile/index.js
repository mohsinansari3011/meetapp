import React, { Component } from 'react';
import swal from 'sweetalert';
import * as firebase from '../../config/firebase'
import coffeeimg from '../../images/coffee.png'
import juiceimg from '../../images/juice.png'
import cocktailimg from '../../images/cocktail.png'
import profileimg from '../../images/profileimg.jpg'
import { Link } from "react-router-dom";



class SetProfile extends Component {



    constructor() {
        super();
        this.state = {

            currentuser: '',
            p1: true,
            p2: false,
            p3: false,
            nickname: '',
            phonenumber: '',
            currentimage: 'image1',
            beverages: [],
            duration: [],
            gotomap: false,
        };

        this.NextS1 = this.NextS1.bind(this);
        this.NextS2 = this.NextS2.bind(this);
        this.BackS2 = this.BackS2.bind(this);
        this.BackS3 = this.BackS3.bind(this);


    }


    componentDidMount() {
        firebase.auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ currentuser: user });
            } else {
                console.info('Must be authenticated');
                this.props.history.push('/');
            }
        });

    }



    handlenickname(e) {
        //const {nickname} = this.state;
        const niname = e.target.value;
        this.setState({
            nickname: niname,
        })

        localStorage.setItem("niname", e.target.value);
    }


    handlephone(e) {
        //const { phonenumber } = this.state;
        const pnumber = e.target.value;
        this.setState({
            phonenumber: pnumber,
        })

        localStorage.setItem("pnumber", e.target.value);
    }





    NextS1() {

        const { phonenumber, nickname } = this.state;
        //console.log(nickname, " nickname ", phonenumber, " phonenumber ");

        if (nickname.length > 0 && phonenumber.length > 0) {
            this.setState({
                p1: false,
                p2: true,
                p3: false,

            })

        } else { swal("badjob!", "Select Data") }
    }
    NextS2() {

        //const { p1, p2, p3, p4 } = this.state;
        var img1 = localStorage.getItem("image1");
        var img2 = localStorage.getItem("image2");
        var img3 = localStorage.getItem("image3");

        if (img1 != null && img2 != null && img3 != null) {
            if (img1.length > 0 && img2.length > 0 && img3.length > 0) {
                this.setState({
                    p1: false,
                    p2: false,
                    p3: true,


                })

            } else { swal("badjob!", "Select All Images") }
        } else { swal("badjob!", "Select All Images") }


    }
    BackS3() {

        //const { p1, p2, p3, p4 } = this.state;

        this.setState({
            p1: false,
            p2: true,
            p3: false,


        })
    }
    BackS2() {

        //const { p1, p2, p3, p4 } = this.state;

        this.setState({
            p1: true,
            p2: false,
            p3: false,


        })
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
                localStorage.setItem(currentimage, imgpath)
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

        localStorage.setItem("beverages", beverages);

        this.checkbevearages();
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

        localStorage.setItem("duration", duration);

        this.checkbevearages();
    }


    checkbevearages() {

        //const { gotomap } = this.state;
        const duration = localStorage.getItem("duration");
        const beverages = localStorage.getItem("beverages");


        //console.log("JSON.parse(duration)  ",JSON.parse(duration));
        if (duration != null && beverages != null) {
            if (duration.length > 0 && beverages.length > 0) {
                this.setState({
                    gotomap: true,
                })
            } else {
                this.setState({
                    gotomap: false,
                })
            }
        } else {
            this.setState({
                gotomap: false,
            })
        }

    }



    profileScreen1() {


        return (<div>
            <label>NickName : </label>
            <input type="text" className="form-control" value={this.state.nickname} onChange={this.handlenickname.bind(this)} placeholder="nickname" />
            <label>Phone : </label>
            <input type="number" className="form-control" value={this.state.phonenumber} onChange={this.handlephone.bind(this)} placeholder="phone number" />
            <br />
            <input className="btn btn-primary" type="button" value="next" onClick={this.NextS1} />

        </div>);
    }


    profileScreen2() {


        return (<div>
            <h1>Select Images</h1>

            <div className="col-md-12">

                <input onChange={this.changefile.bind(this)} id="fileInput1" type="file" style={{ display: "none", }} />

                <div className="col-md-4">
                    <img id="image1" alt="picutre" src={profileimg}
                        className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
                </div>
                <div className="col-md-4">
                    <img id="image2" alt="picutre" src={profileimg}
                        className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
                </div>
                <div className="col-md-4">
                    <img id="image3" alt="picutre" src={profileimg}
                        className="logo" width="120" height="120" onClick={this.clickfile.bind(this)} />
                </div>
            </div>

            <br />  <br />
            <div className="row">
                <div className="mt-2 col-md-12">
                    <input className="btn btn-primary" type="button" value="back" onClick={this.BackS2} /> </div></div>

            <br /><div className="row">
                <div className="mt-2 col-md-12">
                    <input className="btn btn-primary" type="button" value="next" onClick={this.NextS2} /></div></div>

        </div>);
    }


    profileScreen3() {

        const { gotomap } = this.state;

        return (<div>
            <h1>Select Beverages</h1>
            <img alt="Coffee" src={coffeeimg} height="25px" width="25px" />
            <input type="checkbox" onChange={this.selectbeverages.bind(this)} value="Coffee" id="cbcoffee" /> <label htmlFor="cbcoffee">Coffee</label>

            <img alt="Juice" src={juiceimg} height="25px" width="25px" />
            <input type="checkbox" onChange={this.selectbeverages.bind(this)} value="Juice" id="cbjuice" /><label htmlFor="cbjuice">Juice</label>

            <img alt="Cocktail" src={cocktailimg} height="25px" width="25px" />
            <input type="checkbox" onChange={this.selectbeverages.bind(this)} value="Cocktail" id="cbcocktail" /><label htmlFor="cbcocktail">Cocktail</label>


            <br />
            <h1>Select Duration of Meeting</h1>

            <input type="checkbox" onChange={this.selectduration.bind(this)} value="20" id="cb20" /> <label htmlFor="cb20">20 Min </label>
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="60" id="cb60" /> <label htmlFor="cb60">60 Min </label>
            <input type="checkbox" onChange={this.selectduration.bind(this)} value="120" id="cb120" /> <label htmlFor="cb120">120 Min </label>
            <br /><br />
            <input className="btn btn-primary" type="button" value="back" onClick={this.BackS3} />

            {gotomap && <Link to="/maps"> <input className="btn btn-primary" type="button" value="next" /> </Link>}


        </div>);
    }




    render() {


        const { p1, p2, p3 } = this.state
        return (<div> <h1>Setting up your Profile!!! </h1>
            {p1 && !p2 && !p3 && this.profileScreen1()}
            {!p1 && p2 && !p3 && this.profileScreen2()}
            {!p1 && !p2 && p3 && this.profileScreen3()}
        </div>);
    }




}
export default SetProfile;