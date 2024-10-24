import style from "../Tariffs.module.scss";
import tariffs_green_checkbox_icon from "../../../../assets/images/tariffs_green_checkbox_icon.svg";

const TariffCard = ({
  name,
  description,
  icon,
  colorClass,
  activeColorClass,
  isActive,
  isLoggedIn,
  textColorClass,
  price,
  oldPrice,
  installmentText,
  features,
}) => {
  const colorMap = {
    Black: "#000000",
    White: "#ffffff",
  };
  return (
    <div
      className={`${style.tariffCard} ${
        isActive && isLoggedIn ? activeColorClass : ""
      }`}
    >
      <div className={`${style.tariffColoredBlock} ${colorClass}`}>
        <div className={style.tariffNameBlock}>
          <h3 style={{ color: colorMap[textColorClass] }}>{name}</h3>
          <p style={{ color: colorMap[textColorClass] }}>{description}</p>
        </div>
        <div className={style.tariffIconBlock}>
          <img className={style.tariffIcon} src={icon} alt={`${name} icon`} />
        </div>
      </div>

      <div className={style.yourTariffBlock}>
        {isActive && isLoggedIn && (
          <div className={style.yourTariffBadge}>Текущий тариф</div>
        )}
      </div>

      <div className={style.tariffCardTextBlock}>
        <div className={style.tariffPriceBlock}>
          <div className={style.tariffPrices}>
            <h3>{price}</h3>
            <p className={style.lastPriceTag}>{oldPrice}</p>
          </div>
        </div>
        <p className={style.installmentText}>{installmentText}</p>
      </div>

      <div className={style.tariffToInclude}>
        <p className={style.cardText20px}>В тариф входит:</p>
        {features.map((feature, index) => (
          <div key={index} className={style.tariffToIncludeLines}>
            <img
              className={style.greenCheckbox}
              src={tariffs_green_checkbox_icon}
              alt="checkbox"
            />
            <p className={style.cardText}>{feature}</p>
          </div>
        ))}
        <div className={style.tariffButtonDiv}>
          {isActive && isLoggedIn ? (
            <button
              className={`${style.buttonTariffs} ${style.grey}`}
              id="requestDataButton"
            >
              Перейти в личный кабинет
            </button>
          ) : (
            <button className={style.buttonTariffs} id="requestDataButton">
              Подробнее
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TariffCard;
