import { useState, useEffect } from "react";
import style from "../Search.module.scss";

const DocumentCount = ({ documentCount, setDocumentCount }) => {
  const [error, setError] = useState("");

  const validateDocumentCount = () => {
    const count = parseInt(documentCount, 10);

    if (!documentCount) {
      setError("Обязательное поле");
    } else if (isNaN(count) || count < 1) {
      setError("Введите корректные данные");
    } else if (count > 1000) {
      setError("Введите корректные данные");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    validateDocumentCount();
  }, [documentCount]);

  return (
    <div className={`${style.formField} ${style.formFieldInputs}`}>
      <label htmlFor="documentCount">
        Количество документов в выдаче
        <span
          className={
            error
              ? `${style.requiredAsterisk} ${style.error}`
              : style.requiredAsterisk
          }
        >
          *
        </span>
      </label>
      <input
        type="number"
        id="documentCount"
        name="documentCount"
        className={error ? style.inputError : ""}
        value={documentCount}
        onChange={(e) => {
          const newValue = e.target.value;
          setDocumentCount(newValue);
          validateDocumentCount();
        }}
        onBlur={validateDocumentCount}
        placeholder="от 1 до 1000"
      />
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};

export default DocumentCount;
