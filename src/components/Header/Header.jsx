import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import UserBlock from "./UserBlock/UserBlock";
import { useAuth } from "../../context/AuthContext";

import style from "./Header.module.scss";

import useWindowSize from "./useWindowSize";

import scan_logo_green from "../../assets/images/scan_logo_green.svg";
import scan_logo_white from "../../assets/images/scan_logo_white.svg";
import fallout_menu_icon from "../../assets/images/fallout_menu_icon.svg";
import close_icon from "../../assets/images/closing-icon.png";

const Header = ({
  isLoggedIn,
  userName,
  userPicture,
  setUserName,
  setUserPicture,
}) => {
  const { setIsLoggedIn } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 1360;

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const handleLoginAndCloseMenu = () => {
    handleLoginClick();
    setIsMenuVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const tokenExpire = localStorage.getItem("tokenExpire");
      const now = new Date();

      if (!tokenExpire || new Date(tokenExpire) <= now) {
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpire");
      }
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className={isMenuVisible && isMobile ? style.menuVisible : ""}>
      <div className={style.headerContent}>
        <a href="/">
          <img
            className={style.scanLogo}
            src={isMenuVisible && isMobile ? scan_logo_white : scan_logo_green}
            alt="Scan logo"
          />
        </a>

        {!isMobile && <Navbar />}

        {!isMobile && isLoggedIn && (
          <div className={style.rightSection}>
            <UserBlock
              isLoggedIn={isLoggedIn}
              userName={userName}
              userPicture={userPicture}
              setUserName={setUserName}
              setUserPicture={setUserPicture}
            />
          </div>
        )}

        {isMobile && !isMenuVisible && (
          <UserBlock
            isLoggedIn={isLoggedIn}
            userName={userName}
            userPicture={userPicture}
            setUserName={setUserName}
            setUserPicture={setUserPicture}
            isMenuVisible={isMenuVisible}
            isMobile={isMobile}
          />
        )}

        {isMobile && (
          <img
            src={isMenuVisible ? close_icon : fallout_menu_icon}
            alt="Menu"
            className={style.menuIcon}
            onClick={toggleMenuVisibility}
          />
        )}

        {!isLoggedIn && !isMobile && (
          <div className={style.rightSection}>
            <div className={style.regBlock}>
              <a href="/auth" className={style.login}>
                Зарегистрироваться
              </a>
              <div className={style.verticalDivider}></div>
              <button
                className={style.loginButton}
                id="loginButton"
                onClick={handleLoginClick}
              >
                Войти
              </button>
            </div>
          </div>
        )}
      </div>

      {isMenuVisible && isMobile && (
        <div className={style.dropdownMenuPage}>
          <Navbar />
          {isLoggedIn ? (
            <UserBlock
              isLoggedIn={isLoggedIn}
              userName={userName}
              userPicture={userPicture}
              setUserName={setUserName}
              setUserPicture={setUserPicture}
              isMenuVisible={isMenuVisible}
              isMobile={isMobile}
            />
          ) : (
            <div className={style.regBlock}>
              <a href="/auth" className={style.login}>
                Зарегистрироваться
              </a>
              <button
                className={style.loginButton}
                id="loginButton"
                onClick={handleLoginAndCloseMenu}
              >
                Войти
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
