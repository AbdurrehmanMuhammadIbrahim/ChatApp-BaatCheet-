
// import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import SelectedProfilePage from "./pages/SelectedProfilePage"
import { useThemeStore } from "./store/useThemeStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useEffect } from 'react';
import { useChatStore } from "./store/useChatStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { selectedUser, } = useChatStore();
  const { theme } = useThemeStore();

  // console.log();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );


  return (
    <div data-theme={theme}>

      <Navbar />
      <div className=" bg-base-500 max-w-7xl mx-auto px-4 pt-20">
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path={`/selectedprofile/${selectedUser?._id}`} element={<SelectedProfilePage />} />

        </Routes>
        <Toaster />
      </div>
    </div>
  )
}

export default App
