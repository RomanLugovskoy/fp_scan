import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import style from "./Search.module.scss";
import CompanyINN from "./CompanyINN/CompanyINN";
import Tonality from "./Tonality/Tonality";
import DocumentCount from "./DocumentCount/DocumentCount";
import DateInput from "./DateInput/DateInput";
import CheckboxBlock from "./CheckboxBlock/CheckboxBlock";

import search_page_large_picture from "../../assets/images/search_page_large_picture.svg";
import search_page_small_picture_folders from "../../assets/images/search_page_small_picture_folders.svg";
import search_page_small_picture_sheet from "../../assets/images/search_page_small_picture_sheet.svg";

const Search = () => {
  const [companyINN, setCompanyINN] = useState("");
  const [tonality, setTonality] = useState("Любая");
  const [documentCount, setDocumentCount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkboxStates, setCheckboxStates] = useState({
    maxCompleteness: false,
    businessMentions: false,
    mainRole: false,
    riskFactorsOnly: false,
    includeMarketNews: true,
    includeAnnouncements: true,
    includeNewsSummaries: true,
  });

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = companyINN && documentCount && startDate && endDate;
    setIsFormValid(isValid);
  }, [companyINN, documentCount, startDate, endDate, checkboxStates]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let apiTonality;
    switch (tonality) {
      case "Любая":
        apiTonality = "any";
        break;
      case "Позитивная":
        apiTonality = "positive";
        break;
      case "Негативная":
        apiTonality = "negative";
        break;
      default:
        apiTonality = "any";
    }

    if (isFormValid) {
      const searchParams = {
        issueDateInterval: {
          startDate: startDate,
          endDate: endDate,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                inn: companyINN,
                maxFullness: checkboxStates.maxCompleteness,
              },
            ],
            onlyMainRole: checkboxStates.mainRole,
            tonality: apiTonality,
            onlyWithRiskFactors: checkboxStates.riskFactorsOnly,
          },
        },
        attributeFilters: {
          excludeTechNews: !checkboxStates.includeMarketNews,
          excludeAnnouncements: !checkboxStates.includeAnnouncements,
          excludeDigests: !checkboxStates.includeNewsSummaries,
        },
        limit: Number(documentCount),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      };

      console.log("Отправка запроса на сервер с данными:", searchParams);

      navigate("/results", { state: { searchParams: searchParams } });
    } else {
      console.log("Форма не валидна, перенаправление не выполнено.");
    }
  };

  return (
    <div className={style.searchContent}>
      <div className={style.searchTitleBlock}>
        <div className={style.searchTitleText}>
          <h1 className={style.h1SearchPage}>
            Найдите необходимые <br />
            данные в пару кликов.
          </h1>
          <p className={style.pSearchPageTitleBlock}>
            Задайте параметры поиска. <br />
            Чем больше заполните, тем точнее поиск
          </p>
        </div>
        <img
          className={style.searchPageSmallPictureSheet}
          src={search_page_small_picture_sheet}
          alt="Paper"
        />
        <img
          className={style.searchPageSmallPictureFolders}
          src={search_page_small_picture_folders}
          alt="Folders"
        />
      </div>

      <div className={style.searchBlock}>
        <form onSubmit={handleSubmit} className={style.searchForm}>
          <div className={style.leftPartSearchForm}>
            <CompanyINN companyINN={companyINN} setCompanyINN={setCompanyINN} />
            <Tonality tonality={tonality} setTonality={setTonality} />
            <DocumentCount
              documentCount={documentCount}
              setDocumentCount={setDocumentCount}
            />
            <DateInput
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </div>

          <div className={style.rightPartSearchForm}>
            <CheckboxBlock
              checkboxStates={checkboxStates}
              handleCheckboxChange={handleCheckboxChange}
            />
            <div className={style.rightPartSubmitButtonBlock}>
              <button
                className={style.button}
                type="submit"
                disabled={!isFormValid}
              >
                Поиск
              </button>
              <p className={style.starMessage}>
                * Обязательные к заполнению поля
              </p>
            </div>
          </div>
        </form>

        <img
          className={style.searchPageLargePicture}
          src={search_page_large_picture}
          alt="Search"
        />
      </div>
    </div>
  );
};

export default Search;
