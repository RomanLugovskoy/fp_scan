import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import style from "./App.module.scss";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Authorization from "./components/Authorization/Authorization";
import Search from "./components/Search/Search";
import SearchResults from "./components/SearchResults/SearchResults";
import user_pic_example from "./assets/images/user_pic_example.png";

function App() {
  const { isLoggedIn, checkAuthStatus } = useAuth();
  const [userTariff, setUserTariff] = useState("beginner");
  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState(user_pic_example);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Пользователь не залогинен, обновите UI");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <Router>
      <div className={style.appContainer}>
        <Header
          isLoggedIn={isLoggedIn}
          userName={userName}
          setUserName={setUserName}
          userPicture={userPicture}
          setUserPicture={setUserPicture}
        />
        <Routes>
          <Route
            path="/"
            element={<Main isLoggedIn={isLoggedIn} userTariff={userTariff} />}
          />
          <Route path="/auth" element={<Authorization />} />
          <Route
            path="/search"
            element={
              isLoggedIn ? <Search /> : <Authorization redirectBack="/search" />
            }
          />
          <Route
            path="/results"
            element={
              isLoggedIn ? (
                <SearchResults />
              ) : (
                <Authorization redirectBack="/results" />
              )
            }
          />
        </Routes>
      </div>
	  <Footer />
    </Router>
  );
}

export default App;
