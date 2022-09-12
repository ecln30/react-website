












import React, { useState } from 'react'
import { db, auth } from '../firebase'
import {Button,Input} from '@material-ui/core'
import { addDoc,query,serverTimestamp,collection } from 'firebase/firestore'

function Message({ message }) {
    
    const {text,uid,photoURL} = message
    const msgClass = uid === auth.currentUser.uid ? 'sent' : 'received'

    return (
        <>
          <div className={`message ${msgClass}`}>
            <img src={photoURL} />
            <p>{text}</p>
          </div>
        </>
    )}

export default Message



























