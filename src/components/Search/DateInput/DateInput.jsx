import { useState, useEffect } from "react";
import style from "../Search.module.scss";

const DateInput = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [error, setError] = useState("");
  const [inputTypeStart, setInputTypeStart] = useState("text");
  const [inputTypeEnd, setInputTypeEnd] = useState("text");

  const [touchedStart, setTouchedStart] = useState(false);
  const [touchedEnd, setTouchedEnd] = useState(false);

  useEffect(() => {
    validateDateRange();
  }, [startDate, endDate]);

  const validateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (!startDate || !endDate) {
      setError("Обязательное поле");
    } else if (new Date(startDate) > new Date(endDate)) {
      setError("Введите корректные данные");
    } else if (
      new Date(startDate) > currentDate ||
      new Date(endDate) > currentDate
    ) {
      setError("Дата не может быть позже текущей даты");
    } else {
      setError("");
    }
  };

  return (
    <div className={style.formField}>
      <label htmlFor="startDate">
        Диапазон поиска{" "}
        <span
          className={
            error && (touchedStart || touchedEnd)
              ? `${style.requiredAsterisk} ${style.error}`
              : style.requiredAsterisk
          }
        >
          *
        </span>
      </label>
      <div className={style.formFieldDateInputs}>
        <div className={style.dateInputContainer}>
          <input
            type={inputTypeStart}
            onFocus={() => {
              setInputTypeStart("date");
              setTouchedStart(true);
            }}
            onBlur={() => {
              validateDateRange();
              if (!startDate) setInputTypeStart("text");
            }}
            id="startDate"
            name="startDate"
            placeholder="Дата начала"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={error && touchedStart ? style.error : ""}
          />
          <input
            type={inputTypeEnd}
            onFocus={() => {
              setInputTypeEnd("date");
              setTouchedEnd(true);
            }}
            onBlur={() => {
              validateDateRange();
              if (!endDate) setInputTypeEnd("text");
            }}
            id="endDate"
            name="endDate"
            placeholder="Дата конца"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={error && touchedStart ? style.error : ""}
          />
        </div>
        {error && (touchedStart || touchedEnd) && (
          <div className={`${style.dateErrorMessage} ${style.error}`}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateInput;
