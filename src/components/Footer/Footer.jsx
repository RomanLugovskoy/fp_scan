import style from "./Footer.module.scss";
import scan_logo_white from "../../assets/images/scan_logo_white.svg";

const Footer = () => {
  return (
    <footer>
      <div className={style.footerContent}>
        <a href="/">
          <img
            className={style.scanLogo}
            src={scan_logo_white}
            alt="Scan logo"
          />
        </a>
        <div className={style.addressBlock}>
          <address style={{ fontStyle: "normal" }}>
            г. Москва, Цветной б-р, 40
          </address>
          <a className={style.footerLink} href="tel:+74957712111">
            +7 495 771 21 11
          </a>
          <a className={style.footerLink} href="mailto:info@skan.ru">
            info@skan.ru
          </a>
          <p style={{ fontSize: "12px", marginTop: "20px" }}>Copyright. 2022</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
