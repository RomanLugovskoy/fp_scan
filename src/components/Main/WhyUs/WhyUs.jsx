import React from "react";
import style from "./WhyUs.module.scss";
import why_us_large_picture from "../../../assets/images/why_us_large_picture.svg";
import why_us_icon_magnifier from "../../../assets/images/why_us_icon_magnifier.svg";
import why_us_icon_shield from "../../../assets/images/why_us_icon_shield.svg";
import why_us_icon_watch from "../../../assets/images/why_us_icon_watch.svg";
import arrow_right_icon_why_us_carousel from "../../../assets/images/arrow_right_icon_why_us_carousel.svg";

const WhyUs = () => {
  const carouselRef = React.useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= window.innerWidth / 3;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += window.innerWidth / 3;
    }
  };

  return (
    <section className={style.whyUsBlock}>
      <h2>Почему именно мы</h2>

      <div className={style.carousel}>
        <div
          className={`${style.carouselArrow} ${style.leftArrow}`}
          onClick={scrollLeft}
        >
          <img
            src={arrow_right_icon_why_us_carousel}
            alt="arrow"
            role="button"
          />
        </div>

        <div className={style.carouselContent} ref={carouselRef}>
          <div className={style.carouselItem}>
            <img
              className={style.whyUsIcon}
              src={why_us_icon_shield}
              alt="shield icon"
            />
            <p>
              Защита конфиденциальных сведений, <br />
              не подлежащих разглашению по <br />
              федеральному законодательству
            </p>
          </div>
          <div className={style.carouselItem}>
            <img
              className={style.whyUsIcon}
              src={why_us_icon_watch}
              alt="watch icon"
            />
            <p>
              Высокая и оперативная скорость <br />
              обработки заявки
            </p>
          </div>
          <div className={style.carouselItem}>
            <img
              className={style.whyUsIcon}
              src={why_us_icon_magnifier}
              alt="magnifier icon"
            />
            <p>
              Огромная комплексная база <br />
              данных, обеспечивающая <br />
              объективный ответ на запрос
            </p>
          </div>
          <div className={style.carouselItem}>
            <img
              className={style.whyUsIcon}
              src={why_us_icon_shield}
              alt="shield icon"
            />
            <p>
              Защита конфиденциальных сведений, <br />
              не подлежащих разглашению по <br />
              федеральному законодательству
            </p>
          </div>
          <div className={style.carouselItem}>
            <img
              className={style.whyUsIcon}
              src={why_us_icon_watch}
              alt="watch icon"
            />
            <p>
              Высокая и оперативная скорость <br />
              обработки заявки
            </p>
          </div>
        </div>

        <div className={style.carouselArrow} onClick={scrollRight}>
          <img
            src={arrow_right_icon_why_us_carousel}
            alt="arrow"
            role="button"
          />
        </div>
      </div>

      <div className={style.whyUsImageContainer}>
        <img
          className={style.whyUsLargeImage}
          src={why_us_large_picture}
          alt="Why us Scan"
        />
      </div>
    </section>
  );
};

export default WhyUs;
