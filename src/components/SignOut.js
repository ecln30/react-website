













import React from 'react'
import { auth } from '../firebase'

function SignOut() {
  return auth.currentUser && (
    <button className='signOut' onClick={f=> auth.signOut()}>signOut</button> 
)}

export default SignOut






















































