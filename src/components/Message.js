












import React, { useState } from 'react'
import { db, auth } from '../firebase'
import {Button,Input} from '@material-ui/core'
import {addDoc,query,getDocs,collection,deleteDoc,doc} from 'firebase/firestore'

function Message({ message}) {
    
    const {text,uid,photoURL} = message
    const msgClass = uid === auth.currentUser.uid ? 'sent' : 'received'
    console.log(message)
    
    const handleDel = async (e) => {
      const snap = await getDocs(collection(db,'messages'))
      let del = prompt("are you sure to delete this message")
      del === 'yes' &&
      snap.forEach(msg => {
           (msg.data().text === e.target.innerHTML) &&
           deleteDoc(doc(db,'messages', msg.id))                
    })}
     
    return (
        <>
          <div className={`message ${msgClass}`}>
            <img src={photoURL} />
            <p className="msg_txt" onClick={handleDel}>{text}</p>
          </div>
        </>
    )}

export default Message



























