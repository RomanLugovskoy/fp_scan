import style from "./CheckboxBlock.module.scss";

const CheckboxBlock = ({ checkboxStates, handleCheckboxChange }) => {
  const labels = {
    maxCompleteness: "Признак максимальной полноты",
    businessMentions: "Упоминания в бизнес-контексте",
    mainRole: "Главная роль в публикации",
    riskFactorsOnly: "Публикации только с риск-факторами",
    includeMarketNews: "Включать технические новости рынков",
    includeAnnouncements: "Включать анонсы и календари",
    includeNewsSummaries: "Включать сводки новостей",
  };

  return (
    <div className={style.rightPartSearchCheckboxBlock}>
      {Object.keys(checkboxStates).map((key) => (
        <div key={key} className={style.checkboxContainer}>
          <input
            type="checkbox"
            id={`checkbox-${key}`}
            name={key}
            checked={checkboxStates[key]}
            onChange={handleCheckboxChange}
            className={style.hiddenCheckbox}
          />
          <label
            htmlFor={`checkbox-${key}`}
            className={checkboxStates[key] ? style.checkedLabel : ""}
          >
            <span className={style.customCheckbox}></span>
            <span className={style.labelText}>{labels[key]}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxBlock;
