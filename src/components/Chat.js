













import Reac,{useState,useEffect,useRef} from 'react'
import {db,auth} from '../firebase'
import {collection,query,onSnapshot,orderBy,limit,serverTimestamp,addDoc} from 'firebase/firestore'
import SignOut from './SignOut'
import Message from './Message'
import { useCollectionData } from 'react-firebase-hooks/firestore'

function Chat({user,list}) {
  const q = query(collection(db,'messages'),orderBy('createdAt'),limit(25))
  const [messages] = useCollectionData(q ,{idField:'id'});
  const [msg, setMsg] = useState(''); 
  const dummy = useRef()

  useEffect(f => {
     dummy.current.scrollIntoView({behavior:'smooth'})
  },[messages])
  
  const sendMessage = async (e) => {
     e.preventDefault()
     const {uid, photoURL} = auth.currentUser;
     await addDoc(collection(db,'messages'), { 
       text:msg,
       uid, photoURL,
       createdAt:serverTimestamp()
     })
     setMsg('')
  }
    return (<>
        <main>
        {messages?.map(msg => <Message key={msg.id} message={msg} 
          id={msg.id}
        />)}
        <div className="ImgFile">
        {list.map(url => <img className='Imgs' src={url} 
          
        />)}
        </div>
       </main>
       <span ref={dummy}></span>
       <form onSubmit={sendMessage}>

      <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="say something nice" />
   
      <button type="submit" disabled={!msg}>🕊️</button>

    </form>
</>)}

export default Chat












































































