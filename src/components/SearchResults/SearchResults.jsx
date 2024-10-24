import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import style from "./SearchResults.module.scss";
import GeneralSummaryTable from "./GeneralSummaryTable/GeneralSummaryTable";
import ArticleCards from "./ArticleCards/ArticleCards";
import search_results_large_picture from "../../assets/images/search_results_large_picture.svg";

const SearchResults = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchParams = location.state?.searchParams;
      if (!searchParams) {
        console.error("Search parameters are missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setIsError(false);

      try {
        const histogramResponse = await fetch(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(searchParams),
            credentials: "omit",
          }
        );

        if (!histogramResponse.ok) {
          throw new Error(`HTTP error! status: ${histogramResponse.status}`);
        }

        const histogramData = await histogramResponse.json();

        const publicationIdsResponse = await fetch(
          "https://gateway.scan-interfax.ru/api/v1/objectsearch",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(searchParams),
            credentials: "omit",
          }
        );

        if (!publicationIdsResponse.ok) {
          throw new Error(
            `HTTP error! status: ${publicationIdsResponse.status}`
          );
        }

        const publicationIdsData = await publicationIdsResponse.json();
        const publicationIds = publicationIdsData.items.map(
          (item) => item.encodedId
        );

        console.log("количество публикаций:", publicationIds.length);

        const documentsResponse = await fetch(
          "https://gateway.scan-interfax.ru/api/v1/documents",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ ids: publicationIds }),
            credentials: "omit",
          }
        );

        if (!documentsResponse.ok) {
          throw new Error(`HTTP error! status: ${documentsResponse.status}`);
        }

        const documentsData = await documentsResponse.json();
        setSearchData(histogramData);
        setDocumentsData(documentsData);
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [JSON.stringify(location.state?.searchParams)]);

  return (
    <div className={style.searchResultsContent}>
      {isLoading && (
        <>
          <div className={style.searchResultsTitleBlock}>
            <div className={style.searchResultsTitleText}>
              <h1 className={style.h1SearchResultsPage}>
                Ищем. Скоро будут результаты
              </h1>
              <p className={style.pSearchResultsPageTitleBlock}>
                Поиск может занять некоторое время, просим сохранять терпение.
              </p>
            </div>
            <img
              className={style.searchResultsLargePicture}
              src={search_results_large_picture}
              alt="Search results"
            />
          </div>
          <GeneralSummaryTable
            searchData={searchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </>
      )}

      {!isLoading && isError && (
        <>
          <GeneralSummaryTable
            searchData={searchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isError={isError}
          />
        </>
      )}

      {!isLoading && !isError && (
        <>
          <GeneralSummaryTable
            searchData={searchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isError={isError}
          />
          <ArticleCards documentsData={documentsData} />
        </>
      )}
    </div>
  );
};

export default SearchResults;
