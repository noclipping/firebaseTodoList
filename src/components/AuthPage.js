import { useState, React, useEffect } from "react";

import { FaSave, FaReact, FaGithub, FaGoogle } from "react-icons/fa";


import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'


export default function AuthPage(props){
    const [signedIn, setSignedIn] = useState(false)
    const [currentUser,setCurrentUser] = useState()
    const provider = new firebase.auth.GoogleAuthProvider()

    useEffect(()=>{
    const signInStatus = JSON.parse(localStorage.getItem("signInStatus"));
    console.log(signInStatus,'si status')
    if(signInStatus){
        setSignedIn(signInStatus)
    }
      firebase.app().auth().onAuthStateChanged(user=>{
        setCurrentUser(user)
        props.upperUserFunc(user)
        
      })
    },[])

    const authWithGoogle = () =>{

      firebase.auth().signInWithPopup(provider)

        .then(result=>{
            console.log('result: ',result);
            setSignedIn(true);
            localStorage.setItem("signInStatus", JSON.stringify(true));})

            .then(console.log(signedIn,'signedin?'))

                .catch(e=>{console.log('SIGN-IN ERROR:',e)})
    }
    const buttonStyle = { background:'none', color: 'white', cursor:'pointer' }
    const signOut= ()=>{
        setSignedIn(false);
        localStorage.setItem("signInStatus", JSON.stringify(false));
        console.log(signedIn)
        firebase.auth().signOut().then(() => {
            
          }).catch((error) => {
            // An error happened.
          });

    }
    return (<div>
      {currentUser? <img src ={currentUser.photoURL} alt="avatar" style={{width:40,height:40}}></img>:null}
      {currentUser? <p>{currentUser.displayName}</p>:null}
      <FaGoogle /> {signedIn?<button style = {buttonStyle} onClick={signOut}>Sign Out</button>:<button style = {buttonStyle} onClick = {authWithGoogle}> Login </button>} </div>)
  }