import { useState } from "react";
import style from "../Search.module.scss";

const CompanyINN = ({ companyINN, setCompanyINN }) => {
  const [error, setError] = useState("");

  const [touched, setTouched] = useState(false);

  const validateInn = (inn) => {
    let errorObj = { code: 0, message: "" };
    let result = false;
    if (typeof inn === "number") {
      inn = inn.toString();
    } else if (typeof inn !== "string") {
      inn = "";
    }
    if (!inn.length) {
      errorObj.code = 1;
      errorObj.message = "Обязательное поле";
    } else if (/[^0-9]/.test(inn)) {
      errorObj.code = 2;
      errorObj.message = "Введите корректные данные";
    } else if ([10, 12].indexOf(inn.length) === -1) {
      errorObj.code = 3;
      errorObj.message = "Введите корректные данные";
    } else {
      const checkDigit = (inn, coefficients) => {
        let n = 0;
        for (let i = 0; i < coefficients.length; i++) {
          n += coefficients[i] * inn[i];
        }
        return parseInt((n % 11) % 10, 10);
      };

      let n10, n11, n12;
      switch (inn.length) {
        case 10:
          n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if (n10 === parseInt(inn[9], 10)) {
            result = true;
          }
          break;
        case 12:
          n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
          n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if (n11 === parseInt(inn[10], 10) && n12 === parseInt(inn[11], 10)) {
            result = true;
          }
          break;
        default:
          result = false;
      }

      if (!result) {
        errorObj.code = 4;
        errorObj.message = "Введите корректные данные";
      }
    }
    setError(errorObj.message);
    return result;
  };

  const handleBlur = () => {
    setTouched(true);
    validateInn(companyINN);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCompanyINN(value);
    if (error) {
      setError("");
    }
  };

  return (
    <div className={`${style.formField} ${style.formFieldInputs}`}>
      <label htmlFor="companyINN">
        ИНН компании{" "}
        <span
          className={
            error && touched
              ? `${style.requiredAsterisk} ${style.error}`
              : style.requiredAsterisk
          }
        >
          *
        </span>
      </label>
      <input
        type="text"
        id="companyINN"
        name="companyINN"
        className={error && touched ? style.inputError : ""}
        value={companyINN}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="10 или 12 цифр"
      />
      {error && touched && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};

export default CompanyINN;
