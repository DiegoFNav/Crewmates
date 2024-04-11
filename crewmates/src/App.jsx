import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='main_container'>
      <div className='side_bar'>
        <h2><Link to="/home">Home</Link></h2>
        <h2><Link to="/create">Create</Link></h2>
        <h2><Link to="/gallery">Gallery</Link></h2>
      </div>
      <div className='page_container'>
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default App
