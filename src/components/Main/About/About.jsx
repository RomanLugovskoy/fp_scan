import { useNavigate } from "react-router-dom";

import style from "./About.module.scss";
import about_picture from "../../../assets/images/about_picture.svg";

const About = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleRequestDataClick = () => {
    if (isLoggedIn) {
      navigate("/search");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className={style.aboutBlock}>
      <div className={style.aboutInfoBlock}>
        <h1 className={style.aboutH1Box}>
          Сервис по поиску
          <br />
          публикаций <br />о компании
          <br />
          по его ИНН
        </h1>
        <p className={style.aboutPBox}>
          Комплексный анализ публикаций, получение данных в формате PDF на
          электронную почту.
        </p>
        {isLoggedIn && (
          <button
            className={style.button}
            id="requestDataButton"
            onClick={handleRequestDataClick}
          >
            Запросить данные
          </button>
        )}
      </div>
      <img className={style.aboutImage} src={about_picture} alt="About Scan" />
    </section>
  );
};

export default About;
