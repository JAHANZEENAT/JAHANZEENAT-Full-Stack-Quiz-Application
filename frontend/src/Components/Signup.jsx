import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'
import axios  from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8002/signup', formData)
      .then(response => {
        navigate('/Login')
      })
      .catch(error => {
        console.error('Form submission failed:', error);
        // Add your logic for error handling
      });
  };

  return (
    <div className='container'> 
      <form onSubmit={handleSubmit}>
        <h1 className='header'>Sign Up</h1>
        <div className="text">
          <div className="inputs">
            <div className="input">
            <img src={user_icon}></img>
        <label htmlFor="name">Name</label>
        <input type="text" placeholder='Enter Name' id="name" name="name" value={formData.name} onChange={handleChange} /><br /><br />
        </div>
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
        <h6>Already an user ? <Link to="/Login">Login</Link></h6>
        <div className="submit-container">
        <button className='submit' type="submit">Sign Up</button>
        </div>
        </div>
        </div>
      </form>
    </div>
  );
}
