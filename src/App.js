import { useState, React, useEffect } from "react";

import Task from "./components/Overview";
import { FaSave, FaReact, FaGithub } from "react-icons/fa";
import uniqid from "uniqid";
import AuthPage from './components/AuthPage'


import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData} from 'react-firebase-hooks/firestore'
//https://www.google.com/search?q=firestore+how+to+store+individual+user+data&oq=firestore+how+to+store+individual+user+data&aqs=chrome..69i57j33i160l4.4117j1j4&sourceid=chrome&ie=UTF-8#kpvalbx=_fTTdYO3qHdGGtQa0sZDwBA34
//https://www.youtube.com/watch?v=2Vf1D-rUMwE
const app = firebase.initializeApp({
    apiKey: "AIzaSyCKAeLIS9TlZR-CUjBwUxJsNZgfh7K5Y_o",
    authDomain: "react-todo-list-953e3.firebaseapp.com",
    projectId: "react-todo-list-953e3",
    storageBucket: "react-todo-list-953e3.appspot.com",
    messagingSenderId: "954384447079",
    appId: "1:954384447079:web:05a758e553b4f3df0886c2"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

let docRef = firestore.doc('users/currentuser')


export default function App(props) {
  const [tasks, setTasks] = useState([]);
  // const [taskEdit, setEdit] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newId, setNewId] = useState(uniqid());
  const [user, setUser] = useState()
  useEffect(() => {
    const documentData = JSON.parse(localStorage.getItem("document"));
    console.log(documentData, "docdata");
    if (localStorage.getItem("document") !== undefined) {
      setTasks(documentData);
    }
  }, []);

  function setMainUser (user){
    docRef = firestore.doc(`users/${user.uid}`)
    
    setUser(user);
    
    console.log(user.tasks, 'tasks')
    docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          setTasks(doc.data().tasks)
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  }

  function deleteFunction(id) {
    const updatedState = tasks.filter((task) => task.id !== id);

    setTasks(updatedState);
  }

  function editTask(id, targettext) {
    const updatedState = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, text: targettext };
      }
      return task;
    });

    setTasks(updatedState);
  }
  function mySubmitHandler(event) {
    event.preventDefault();

    if(tasks){setTasks([...tasks, { text: newTask, id: newId }]);} else {setTasks([{text: newTask, id: newId}])}
    
    setNewTask("");
    setNewId(uniqid());
  }
  console.log(tasks, "tasks2");

  function signoutFunc(){
    setTasks([])
    setUser(null)
    if (localStorage.getItem("document")) {
      setTasks(JSON.parse(localStorage.getItem("document")));
    }
  }
  const tasksDOM = tasks?tasks.map((task) => {
    return (
      <Task
        key={uniqid()}
        text={task.text}
        deleteFunction={deleteFunction}
        item={task}
        editTask={editTask}
      />
    );
  }) : ([])
  return (
    <div className="App">

      <AuthPage upperUserFunc={setMainUser}
      signoutFunc={signoutFunc}/>
      {tasksDOM}
      <hr />
      <br />
      <form onSubmit={mySubmitHandler}>
        <p>
          Enter task, then submit: <br />
        </p>
        <input
          type="text"
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />
        <input type="submit" />
        <br />
        <br />
        <br />

        <FaSave
          cursor="pointer"
          className="icn-spinner"
          size="40"
          onClick={() => {
            if(user){docRef = firestore.doc(`users/${user.uid}`)}
            if(!JSON.parse(localStorage.getItem("signInStatus"))){{localStorage.setItem("document", JSON.stringify(tasks)); }}
            //alert("saved!");
            if(user){docRef.set({User: user.displayName, UserId: user.uid, tasks: tasks}).then(console.log('saved')).catch(e=>console.log('eRR',e))}
         
          }}
        />
        <p style={{ fontSize: 15 }}>click this icon to save your tasks</p>
      </form>

      <footer>
        {" "}
        made with <FaReact
          className="react-spinner"
          color="cyan"
          size="30"
        />  {" "}
         <x style={{ paddingLeft: 10 }} >🔥 Firebase</x>
        <a
          href="https://github.com/aresous"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub style={{ paddingLeft: 30 }} />
      github
        
        </a>

      </footer>
    </div>
  );
}