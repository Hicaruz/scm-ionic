import React, { Component } from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

import { FirebaseAuthProvider, FirebaseAuthConsumer } from "@react-firebase/auth";
import { config } from "./config";
import { Login, Dashboard } from './components'
class App extends Component {
  componentDidMount(){
    navigator.geolocation.watchPosition(console.log)
  }
  logout() {
    firebase.auth().signOut()
  }
  anonymously() {
    firebase.auth().signInAnonymously()
  }
  login(email = "", pass = "") {
    firebase.auth().signInWithEmailAndPassword(email, pass)
  }
  render() {
    setTimeout(() => console.log("init"), 1000);
    return (
      <>
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <FirebaseAuthConsumer>
            {({ isSignedIn, user }) => isSignedIn ?
              <Dashboard
                logout={this.logout}
                user={user}
              /> :
              <Login
                login={this.login}
                anonymously={this.anonymously}
              />}
          </FirebaseAuthConsumer>
        </FirebaseAuthProvider>
      </>
    )
  }
}

export default App;
