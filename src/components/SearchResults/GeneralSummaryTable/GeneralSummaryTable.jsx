import React, { useRef, useEffect, useState } from "react";
import { combineDataByDate } from "./helpers";
import style from "../SearchResults.module.scss";
import loading_icon from "../../../assets/images/loading_icon.svg";

const GeneralSummaryTable = ({ searchData, isLoading, isError }) => {
  const [combinedData, setCombinedData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const tableWrapperRef = useRef(null);

  useEffect(() => {
    if (tableWrapperRef.current) {
      tableWrapperRef.current.scrollLeft = 0;
    }
  }, [combinedData]);

  useEffect(() => {
    if (searchData && !isError) {
      const totalDocuments = searchData.data.find(
        (histogram) => histogram.histogramType === "totalDocuments"
      );
      if (totalDocuments) {
        const total = totalDocuments.data.reduce(
          (acc, item) => acc + item.value,
          0
        );
        setTotalDataCount(total);
      }

      const combined = combineDataByDate(searchData.data);
      setCombinedData(combined);
    }
  }, [searchData, isError]);

  const scrollTable = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    if (tableWrapperRef.current) {
      tableWrapperRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className={style.generalSummaryBlock}>
      <h2 className={style.h2SearchResultsPage}>Общая сводка</h2>
      <p className={style.pGeneralSummaryTitleBlock}>
        Найдено данных: {totalDataCount}
      </p>
      <div className={style.tableAndArrowsContainer}>
        <button
          className={`${style.scrollBtn} ${style.left}`}
          onClick={() => scrollTable("left")}
        ></button>
        <div className={style.tableWrapperMain}>
          <div className={style.tableHeaders}>
            <div className={style.headerPeriod}>Период</div>
            <div className={style.headerTotal}>Всего</div>
            <div className={style.headerRisks}>Риски</div>
          </div>
          <div className={style.tableWrapper} ref={tableWrapperRef}>
            {isLoading ? (
              <div className={style.tableDataLoading}>
                <img
                  src={loading_icon}
                  alt="Loading"
                  className={style.loadingIconGeneralSummary}
                />
                <p className={style.loadingSign}>Загружаем данные...</p>
              </div>
            ) : isError ? (
              <div className={style.tableDataError}>
                <p className={style.error500Message}>
                  Ошибка сервера. Попробуйте чуть позже или проверьте свой
                  тариф.
                </p>
              </div>
            ) : (
              <div className={style.tableData}>
                {combinedData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className={style.dataRow}>
                      <div className={style.dataCell}>{item.period}</div>
                      <div className={style.dataCell}>{item.total}</div>
                      <div className={style.dataCell}>{item.risks}</div>
                    </div>
                    {index < combinedData.length - 1 && (
                      <div className={style.divider}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          className={style.scrollBtn}
          onClick={() => scrollTable("right")}
        ></button>
      </div>
    </div>
  );
};

export default GeneralSummaryTable;
