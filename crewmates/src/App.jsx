import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='side_bar'>
      <Link to={'/home'}><h2>Home</h2></Link>

    </div>
    </>
  )
}

export default App
