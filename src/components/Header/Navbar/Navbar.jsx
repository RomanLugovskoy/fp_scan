import style from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <a href="/">Главная</a>
      <a href="#">Тарифы</a>
      <a href="#">FAQ</a>
    </nav>
  );
};

export default Navbar;
