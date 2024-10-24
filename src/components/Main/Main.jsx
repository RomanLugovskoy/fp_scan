import style from "./Main.module.scss";
import About from "./About/About";
import WhyUs from "./WhyUs/WhyUs";
import Tariffs from "./Tariffs/Tariffs";

const Main = ({ isLoggedIn, userTariff }) => {
  return (
    <main className={style.mainContent}>
      <About isLoggedIn={isLoggedIn} />
      <WhyUs />
      <Tariffs isLoggedIn={isLoggedIn} userTariff={userTariff} />
    </main>
  );
};

export default Main;
