













import React from 'react'
import {auth,signInWithGoogle } from '../firebase.js'
import {Button} from '@material-ui/core'

function Signin() {

  return (
     <div>
        <button  onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  )
}

export default Signin








































