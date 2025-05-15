import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import { MoodLogPage } from './pages/MoodLogPage.jsx'
import Home from './components/Home/Home.jsx'
import Error404 from './components/Error404/Error404.jsx'
import AddJournalEntry from './pages/AddJournalEntry.jsx'
import { MeditationPage } from './pages/MeditationPage.jsx'
import SignIn from './components/Auth/SignIn.jsx'
import { UserProvider } from './store/userContext.jsx'
// import MoodDashboard from './components/MoodDashboard/moodDashboard.jsx'
import CommunityPage from './pages/CommunityPage.jsx'
import NewPostPage from './pages/New.jsx'
import PostPage from './pages/PostPage.jsx'

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
      path: 'community',
      element: <CommunityPage/>
    },
    // {
    //   path: 'moodDashboard',
    //   element: <MoodDashboard/>
    // }
    {
      path:'community/new',
      element: <NewPostPage/>
    },
    {
      path:'community/:postId',
      element: <PostPage/>
    }
  ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={navrouter}></RouterProvider>
    </UserProvider>
  </React.StrictMode>,
)

