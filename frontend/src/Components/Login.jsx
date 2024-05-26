import React,{useState} from 'react'
import './LoginSignup.css'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'
import axios  from 'axios'
import { Link,useNavigate } from 'react-router-dom'


export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password:''
      });
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8002/login', formData)
          .then(response => {
    
            localStorage.setItem('user',JSON.stringify({
                email :response.data.email,
                name : response.data.name,
            }))
            navigate('/home')
          })
         
          .catch(error => {
            console.error('Form submission failed:', error);
            // Add your logic for error handling
          });
      };
    
  return (
      <div className='container'> 
      <form onSubmit={handleSubmit}>
        <h1 className='header'>Login</h1>
        <div className="text">
          <div className="inputs">
        <div className="input">
        <img src={email_icon}></img>
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder='Enter Email' id="email" name="email" value={formData.email} onChange={handleChange} /><br /><br />
        </div>
        <div className="input">
        <img src={password_icon}></img>
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='Enter Password' id="password" name="password" value={formData.password} onChange={handleChange} /><br /><br />
        </div>
        <div className="submit-container">
        <button type="submit">Login</button>
        </div>
        </div>
        </div>
      </form>
    </div>
  )
}
