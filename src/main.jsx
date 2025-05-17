import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import { MoodLogPage } from "./pages/MoodLogPage.jsx";
import Home from "./components/Home/Home.jsx";
import Error404 from "./components/Error404/Error404.jsx";
import AddJournalEntry from "./pages/AddJournalEntry.jsx";
import MeditationPage from "./pages/MeditationPage.jsx";
import MeditationStartPage from "./pages/MeditationStartPage.jsx";
import MeditationSessionPage from "./pages/MeditationSessionPage.jsx";
import MeditationCompletedPage from "./pages/MeditationCompletedPage.jsx";
import MeditationHistoryPage from "./pages/MeditationHistoryPage.jsx";
import SignIn from "./components/Auth/SignIn.jsx";
import { UserProvider } from "./store/userContext.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import NewPostPage from "./pages/NewPostPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import JournalEntriesPage from "./pages/JournalEntriesPage.jsx";
import { Toaster } from "react-hot-toast"
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import AuthGuard from "./components/Auth/AuthGuard.jsx";
import Onboarding from "./components/Auth/Onboarding.jsx";

const navrouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "moodlog", element: <MoodLogPage /> },
      { path: "myjournal", element: <AddJournalEntry /> },
      { path: "meditation", element: <MeditationPage /> },
      { path: "meditation/start", element: <MeditationStartPage /> },
      { path: "meditation/session", element: <MeditationSessionPage /> },
      { path: "meditation/completed", element: <MeditationCompletedPage /> },
      { path: "meditation/history", element: <MeditationHistoryPage /> },
      { path: "signin", element: <SignIn /> },
      { path: "onboarding", element: <Onboarding /> },
      { path: "community", element: <CommunityPage /> },
      { path: "community/new", element: <NewPostPage /> },
      { path: "community/:postId", element: <PostPage /> },
      { path: "journal-entries", element: <JournalEntriesPage/> },
      { path: "*", element: <Error404 /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <RouterProvider router={navrouter} />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </UserProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
