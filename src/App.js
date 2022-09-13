













import React,{useState,useRef,useEffect} from 'react'
import './App.css'
import Signin from './components/Signin'
import Chat from './components/Chat'
import SignOut from './components/SignOut'
import {auth,db} from './firebase.js'
import { ref,getStorage,uploadBytes,getDownloadURL, listAll, deleteObject } from 'firebase/storage'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, deleteDoc,collection,getDocs,query } from "firebase/firestore"
import { SettingsRemote } from '@material-ui/icons'
import { Input } from '@material-ui/core'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ArrowLeftRounded } from '@mui/icons-material'


function App() {
  const [user] = useAuthState(auth)
  const [img, setImg] = useState('')
  const [list,setList] = useState([])
  const inputRef = useRef()
  const storage = getStorage()
  const imgRef = ref(storage, `images/${img.name}`)
  const imgListRef = ref(storage, 'images/')
// upload image to  firebase storage

  const upload = async () => {
    if (!img) return;
    uploadBytes(imgRef, img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setList((prev) => [...prev, url]);
      });
    })}

    useEffect(() => {
      listAll(imgListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setList((prev) => [...prev, url]);
    })})})}, []);

// delete select img from fire store 
function handleDelete(e) {
   let ImgDelete = prompt('Are you sure do this')
   if(ImgDelete !== 'yes')return
   listAll(imgListRef).then(res => {
    res.items.forEach(item => {
      console.log(item._location.path_)
       getDownloadURL(item).then(url => {
          if(url === e.target.src) {
             const path = item._location.path_
             const Delref = ref(storage, path)
             deleteObject(Delref).then(f => alert('deleted img'))
             const newItems = list?.filter(url => e.target.src !== url)
             setList(newItems)
          }
       })
    })
   })
}

// delete all message from  firebasestore
  const delMsg = async f => {
    const snap = await getDocs(collection(db,'messages'))
    let warn = prompt('are you sure ? if you do you lost all messages')
    warn === 'yes' &&
    snap.forEach(msg => {
      deleteDoc(doc(db,'messages', msg.id))
    })}
    
  const handleClick = f => {
     inputRef.current.click()
  }
   
  return (
    <div className="App">
    <header>
      <h1>⚛️🔥💬</h1>
      <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={e => setImg(e.target.files[0])}
      />
      <button onClick={upload}>Upload</button>
      <AttachFileIcon onClick={handleClick} />
      <h1 onClick={delMsg}>clear</h1>
      <SignOut />
    </header>

    <section>
      {user ? <Chat list={list} handleDelete={handleDelete} /> : <Signin />}
    </section>

  </div>
  )
}

export default App















































