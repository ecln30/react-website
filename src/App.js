













import React,{useState} from 'react'
import './App.css'
import Signin from './components/Signin'
import Chat from './components/Chat'
import SignOut from './components/SignOut'
import {auth,db} from './firebase.js'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, deleteDoc,collection,getDocs,query } from "firebase/firestore"

function App() {
  const [user] = useAuthState(auth)
  const delMsg = async f => {
    const snap = await getDocs(collection(db,'messages'))
    snap.forEach(msg => {
      deleteDoc(doc(db,'messages', msg.id))
    } )
  }
    
 
  return (
    <div className="App">
    <header>
      <h1>⚛️🔥💬</h1>
      <h1 onClick={delMsg}>clear</h1>
      <SignOut />
    </header>

    <section>
      {user ? <Chat /> : <Signin />}
    </section>

  </div>
  )
}

export default App















































