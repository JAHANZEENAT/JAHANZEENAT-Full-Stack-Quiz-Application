import { useState } from 'react'
import './App.css'
import Quiz from './Components/Quiz'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import Score from './Components/Score'
import  {Route,Routes,BrowserRouter} from 'react-router-dom'

function App() {
  

  return (
    <>
     <BrowserRouter>
    <Routes>
      <Route exact path='' element={<Signup/>}></Route>
      <Route exact path='/Login' element={<Login/>}></Route>
      <Route exact path='/home' element={<Home/>}></Route>
      <Route exact path='/quiz' element={<Quiz/>}></Route>
      <Route exact path='/score' element={<Score/>}></Route>
    </Routes>
    </BrowserRouter> 
    
    </>
  )
}

export default App
