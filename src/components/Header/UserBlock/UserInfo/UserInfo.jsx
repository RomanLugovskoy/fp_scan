import { useAuth } from "../../../../context/AuthContext";
import style from "./UserInfo.module.scss";
import loading_icon from "../../../../assets/images/loading_icon.svg";

const UserInfo = ({ userName, userPicture, isLoading }) => {
  const { setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpire");
  };

  return (
    <div className={style.userInfo}>
      <div className={style.userDetails}>
        <div className={style.userName}>{userName}</div>

        <a href="#" className={style.logoutLink} onClick={handleLogout}>
          Выйти
        </a>
      </div>
      {isLoading ? (
        <img src={loading_icon} alt="Loading" className={style.loadingIcon} />
      ) : (
        <img src={userPicture} alt="User" className={style.userPicture} />
      )}
    </div>
  );
};

export default UserInfo;
