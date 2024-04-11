import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Details from './components/Details.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import Gallery from './components/Gallery.jsx'
import Create from './components/Create.jsx'
import Update from './components/Update.jsx'
import Home from './components/Home.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: '/home',
      element: <Home />,
    }, {
      path: '/teammate/:id',
      element: <Details />,
    }, {
      path: '/update/:id',
      element: <Update />,
    }, {
      path: '/gallery',
      element: <Gallery />,
    }, {
      path: '/create',
      element: <Create />,
    },
  ],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
