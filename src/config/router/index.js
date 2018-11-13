import React from 'react';
import {  BrowserRouter as Router, Route } from "react-router-dom";
import * as Screens from '../../screens'


const Routes = () => (
    <Router>
        <div>
            <Route exact path="/" component={Screens.LoginScreen} />
            <Route path="/dashboard" component={Screens.DashboardScreen} />
            <Route path="/maps" component={Screens.MapScreen} />
            <Route path="/directions" component={Screens.directionsScreen} />
            <Route path="/profile" component={Screens.ProfileScreen} />
            <Route path="/setprofile" component={Screens.SetProfileScreen} />
            <Route path="/setupmeeting" component={Screens.SetupMeeting} />
            <Route path="/viewmeetings" component={Screens.ViewMeetings} />
        </div>
    </Router>
);

// const fakeAuth = {
//     isAuthenticated: false,
// };


// const AuthButton = withRouter(
//     ({ history }) =>
//         fakeAuth.isAuthenticated ? (
//             <p>
//                 Welcome!{" "}
//                 <button
//                     onClick={() => {
//                         fakeAuth.signout(() => history.push("/"));
//                     }}
//                 >
//                     Sign out
//           </button>
//             </p>
//         ) : (
//                 <p>You are not logged in.</p>
//             )
// );


// const PrivateRoute = ({ component: Component, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 fakeAuth.isAuthenticated ? (
//                     <Component {...props} />
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/",
//                                 state: { from: props.location, fakeAuth }
//                             }}
//                         />
//                     )
//             }
//         />
//     )
// };


export default Routes;