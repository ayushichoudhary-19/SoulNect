import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import { MoodLogPage } from './pages/MoodLogPage.jsx'
import Home from './components/Home/Home.jsx'
import Footer from './components/Footer/Footer.jsx'
import Error404 from './components/Error404/Error404.jsx'
import AddJournalEntry from './pages/AddJournalEntry.jsx'
import { MeditationPage } from './pages/MeditationPage.jsx'
import SignIn from './components/Login/Signin.jsx'
import MoodDashboard from './components/MoodDashboard/moodDashboard.jsx'

const navrouter = createBrowserRouter([
  {path: '/',
  element: <Layout/>,
  children: [
    {
      path: '',
      element: <Home/>
    },
    {
      path: 'moodlog',
      element: <MoodLogPage/>
    },
    {
      path: 'myjournal',
      element: <AddJournalEntry/>
    },
    {
      path: 'meditation',
      element: <MeditationPage/>
    },
    {
      path: '*',
      element: <Error404/>
    },
    {
      path: 'signin',
      element: <SignIn/>
    },
    {
      path: 'moodDashboard',
      element: <MoodDashboard/>
    }
  ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={navrouter}></RouterProvider>
  </React.StrictMode>,
)

