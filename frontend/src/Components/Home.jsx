import React,{useEffect,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './LoginSignup.css'
import axios from 'axios';

export default function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);
  return (
    <div className="container" style={{height : "1vh"}}>
        {user ? (
        <h3>Welcome {user.name}</h3>
        
      ) : null}
        <button type="submit" onClick={()=>{navigate('/quiz')}}>Play</button>
        <button type="submit" onClick={()=>{navigate('/score')}}>Check Score</button>

    </div>
  )
}
