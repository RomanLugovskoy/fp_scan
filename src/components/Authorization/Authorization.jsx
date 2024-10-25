import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import style from "./Authorization.module.scss";
import authorization_icon_facebook from "../../assets/images/authorization_icon_facebook.svg";
import authorization_icon_google from "../../assets/images/authorization_icon_google.svg";
import authorization_icon_lock from "../../assets/images/authorization_icon_lock.svg";
import authorization_icon_yandex from "../../assets/images/authorization_icon_yandex.svg";
import authorization_large_picture from "../../assets/images/authorization_large_picture.svg";

const Authorization = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://gateway.scan-interfax.ru/api/v1/account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            login: username,
            password: password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenExpire", data.expire);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        throw new Error(data.message || "Ошибка при входе");
      }
    } catch (error) {
      console.error("Ошибка аутентификации:", error);
      setUsernameError(true);
      setPasswordError(true);
    }
  };

  const validateUsername = (input) => {
    setUsernameError(false);
  };

  const validatePassword = (input) => {
    setPasswordError(false);
  };

  const handleUsernameChange = (e) => {
    const input = e.target.value;
    setUsername(input);
    validateUsername(input);
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword(input);
  };

  return (
    <div className={style.authContent}>
      <div className={style.textAndPicture}>
        <h1 className={style.h1AuthPage}>
          Для оформления подписки <br /> на тариф, необходимо <br />{" "}
          авторизоваться.
        </h1>
        <img
          className={style.authLargeImageDesktop}
          src={authorization_large_picture}
          alt="People with key"
        />
      </div>

      <div className={style.authBlock}>
        <img
          className={style.authIconLock}
          src={authorization_icon_lock}
          alt="Key"
        />
        <div className={style.authForm}>
          <div className={style.tabs}>
            <div className={style.tab + " " + style.active}>Войти</div>
            <div className={style.tab}>
              <a className={style.inactive} href="#">
                Зарегистрироваться
              </a>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className={style.input}>
              <label htmlFor="username">Логин или номер телефона:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
                style={{
                  borderColor: usernameError ? "red" : "",
                  outline: usernameError ? "none" : "",
                }}
              />
              {usernameError && (
                <div className={style.authFormError}>
                  Введите корректные данные
                </div>
              )}
            </div>

            <div className={style.input}>
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                required
                style={{
                  borderColor: passwordError ? "red" : "",
                  outline: passwordError ? "none" : "",
                }}
              />
              {passwordError && (
                <div className={style.authFormError}>
                  Введите правильный пароль
                </div>
              )}
            </div>

            <div className={style.authButtonDiv}>
              <button
                className={style.button + " " + style.authButton}
                type="submit"
                disabled={!username || !password}
              >
                Войти
              </button>
            </div>

            <a href="#" className={style.resetPassword}>
              Восстановить пароль
            </a>
          </form>

          <div className={style.authSocialMedia}>
            <p className={style.enterWith}>Войти через:</p>
            <div className={style.socialButtons}>
              <button>
                <img src={authorization_icon_google} alt="Google" />
              </button>
              <button>
                <img src={authorization_icon_facebook} alt="Facebook" />
              </button>
              <button>
                <img src={authorization_icon_yandex} alt="Yandex" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <img
        className={style.authLargeImageMobile}
        src={authorization_large_picture}
        alt="People with key"
      />
    </div>
  );
};

export default Authorization;
