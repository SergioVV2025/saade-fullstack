import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import About from "./pages/About/About";
import Reservation from "./pages/Reservation/Reservation";
import Explore from "./pages/Explore/Explore";

import SigninPopup from "./components/SigninPopup/SigninPopup";
import SignupPopup from "./components/SignupPopup/SignupPopup";
import { signin, signup, getCurrentUser } from "./utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setIsCheckingToken(false);
        return;
      }

      try {
        const data = await getCurrentUser(token);

        setCurrentUser(data.user);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("jwt");
      } finally {
        setIsCheckingToken(false);
      }
    };

    checkToken();
  }, []);

  async function handleSignin(email, password) {
    try {
      setAuthError("");

      const data = await signin(email, password);

      localStorage.setItem("jwt", data.token);

      const userData = await getCurrentUser(data.token);

      setCurrentUser(userData.user);
      setIsLoggedIn(true);
      closeAllPopups();
    } catch (err) {
      setAuthError(err.message);
    }
  }

  async function handleSignup(name, email, password, confirmPassword) {
    try {
      setAuthError("");

      await signup(name, email, password, confirmPassword);
      await handleSignin(email, password);

      return true;
    } catch (err) {
      setAuthError(err.message);

      return false;
    }
  }

  function handleSignout() {
    console.log("Signout");
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  }

  function handleSigninClick() {
    setIsSigninPopupOpen(true);
    setAuthError("");
  }

  function handleSignupClick() {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(true);
    setAuthError("");
  }

  function closeAllPopups() {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setAuthError("");
  }

  if (isCheckingToken) {
    return null;
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onSigninClick={handleSigninClick}
        onSignout={handleSignout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SigninPopup
        isOpen={isSigninPopupOpen}
        onClose={closeAllPopups}
        onSignin={handleSignin}
        onSignupClick={handleSignupClick}
        error={authError}
      />
      <SignupPopup
        isOpen={isSignupPopupOpen}
        onClose={closeAllPopups}
        onSignup={handleSignup}
        error={authError}
      />

      <Footer />
    </>
  );
}

export default App;
