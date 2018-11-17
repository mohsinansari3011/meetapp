import React, { Component } from 'react';
import './App.css';
import * as firebase from './config/firebase'
import logo from './logo.svg';
import Routes from './config/router'
import Background from './images/background.jpg'

//const providerx = firebase.provider;

class App extends Component {


constructor(prop){

	super(prop)


	this.state = {
		
		currentuser: null
	};

	// this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
	
}

	


	

	logout() {
		//firebase.auth.signOut().then()
		firebase.auth.signOut().then(function (result) {
			var user = result;
			console.log(user);
			// this.setState({
			// 	currentuser: null
			// })


		}).catch(function (error) {
			console.error("error** ", error);
		});
	}

	



  render() {

  

	 
	  let bgimage = { backgroundImage: `url(${Background})` }

	  return (

		
		  <div className="App">
			  <header className="App-header-a">
				  <img src={logo} className="App-logo" alt="logo" />
				  <h1 className="App-title">Meetoo App</h1>
				  <button class="btn btn-primary"  onClick={this.logout}><i class="fa fa-close"></i>Logout</button>
			  </header>
			  <div className="container" style={bgimage}>
				
			
					  <Routes />
				
				
			  </div>


			  <footer className="App-header-a">
				  <h1 className="App-title">Meetoo App</h1>
			  </footer>

		  </div>
	  )
  }

}





export default App;
