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
import { createClient } from '@supabase/supabase-js';


const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
// Initialize Supabase client
const supabaseUrl = 'https://xncubdskexcpwavrvjof.supabase.co';
const supabaseKey = ACCESS_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

          
const classImages = {
  warrior: "/warrior.JPG",
  lancer: "/lancer.JPG",
  machinist: "/machinist.JPG",
  monk: "/monk.JPG",
  ninja: "/ninja.JPG",
  reaper: "/reaper.JPG",
  red_mage: "/red_mage.JPG",
  black_mage: "/black_mage.JPG",
  white_mage: "/white_mage.JPG",
};

const classStats = {
  warrior: { hp: 15, atk: 1.2, matk: 0.5, def: 2, mdef: 1, spd: 1, lu: .2 },
  lancer: { hp: 12, atk: 1.1, matk: 0.2, def: 1.5, mdef: 0.7, spd: 1.6, lu: .3 },
  machinist: { hp: 19, atk: 1.3, matk: .2, def: 1.7, mdef: 1.4, spd: 0.3, lu: .4 },
  monk: { hp: 8, atk: 1.4, matk: 0.1, def: .4, mdef: .2, spd: 1.8, lu: 1 },
  ninja: { hp: 7, atk: 1.2, matk: 1.2, def: .3, mdef: .3, spd: 1.7, lu: .5 },
  reaper: { hp: 11, atk: 1.3, matk: 1.3, def: .8, mdef: .8, spd: .3, lu: .1 },
  red_mage: { hp: 16, atk: .8, matk: 1.1, def: 1.2, mdef: 1.2, spd: 1.4, lu: .3 },
  black_mage: { hp: 14, atk: 0.5, matk: 1.4, def: 1, mdef: .5, spd: .4, lu: .9 },
  white_mage: { hp: 9, atk: 0.1, matk: 1.6, def: .3, mdef: 1.8, spd: .8, lu: .1 },
};



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      }, {
        path: '/home',
        element: <Home />,
      }, {
        path: '/create',
        element: <Create classImages={classImages} classStats={classStats} supabase={supabase} />,
      }, {
        path: '/gallery',
        element: <Gallery classImages={classImages} supabase={supabase}/>,
      }, {
        path: '/update/:id',
        element: <Update classImages={classImages} classStats={classStats} supabase={supabase} />,
      }, {
        path: '/teammate/:id',
        element: <Details />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
