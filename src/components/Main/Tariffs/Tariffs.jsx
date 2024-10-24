import TariffCard from "./TariffCard/TariffCard";
import style from "./Tariffs.module.scss";

import tariffs_icon_lamp from "../../../assets/images/tariffs_icon_lamp.svg";
import tariffs_icon_laptop from "../../../assets/images/tariffs_icon_laptop.svg";
import tariffs_icon_target from "../../../assets/images/tariffs_icon_target.svg";

const Tariffs = ({ isLoggedIn, userTariff }) => {
  return (
    <section className={style.tariffsBlock}>
      <h2>Наши тарифы</h2>
      <div className={style.tariffsCards}>
        <TariffCard
          name="Beginner"
          description="Для небольшого исследования"
          icon={tariffs_icon_lamp}
          colorClass={style.tariffBeginnerYellow}
          activeColorClass={style.tariffBeginnerYellowActive}
          isActive={userTariff === "beginner"}
          isLoggedIn={isLoggedIn}
          textColorClass="Black"
          price="799 ₽"
          oldPrice="1200 ₽"
          installmentText="или 150 ₽/мес. при рассрочке на 24 мес."
          features={[
            "Безлимитная история запросов",
            "Безопасная сделка",
            "Поддержка 24/7",
          ]}
        />
        <TariffCard
          name="Pro"
          description="Для HR и фрилансеров"
          icon={tariffs_icon_target}
          colorClass={style.tariffProLightBlue}
          activeColorClass={style.tariffProLightBlueActive}
          isActive={userTariff === "pro"}
          isLoggedIn={isLoggedIn}
          textColorClass="Black"
          price="1 299 ₽"
          oldPrice="2 600 ₽"
          installmentText="или 279 ₽/мес. при рассрочке на 24 мес."
          features={[
            "Все пункты тарифа Beginner",
            "Экспорт истории",
            "Рекомендации по приоритетам",
          ]}
        />
        <TariffCard
          name="Business"
          description="Для корпоративных клиентов"
          icon={tariffs_icon_laptop}
          colorClass={style.tariffBusinessBlack}
          activeColorClass={style.tariffBusinessBlackActive}
          isActive={userTariff === "business"}
          isLoggedIn={isLoggedIn}
          textColorClass="White"
          price="2 379 ₽"
          oldPrice="3 700 ₽"
          installmentText=""
          features={[
            "Все пункты тарифа Pro",
            "Безлимитное количество запросов",
            "Приоритетная поддержка",
          ]}
        />
      </div>
    </section>
  );
};

export default Tariffs;
