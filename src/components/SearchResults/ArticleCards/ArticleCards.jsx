import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard/ArticleCard";

import style from "../SearchResults.module.scss";

import mock_article_1_picture from "../../../assets/images/mock_article_1_picture.png";

function ArticleCards({ documentsData }) {
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState(2);

  useEffect(() => {
    if (documentsData && Array.isArray(documentsData)) {
      const transformedArticles = documentsData.map((doc) => ({
        date: new Date(doc.ok.issueDate).toLocaleDateString("ru-RU"),
        url: doc.ok.url,
        sourceName: doc.ok.source.name,
        isTechNews: doc.ok.attributes.isTechNews,
        isAnnouncement: doc.ok.attributes.isAnnouncement,
        isDigest: doc.ok.attributes.isDigest,
        title: doc.ok.title.text,
        content: doc.ok.content.markup,
        wordCount: doc.ok.attributes.wordCount,
        picture: mock_article_1_picture,
      }));

      setArticles(transformedArticles);
    }
  }, [documentsData]);

  const showMoreArticles = () => {
    setDisplayedArticles((prev) => prev + 2);
  };

  return (
    <div className={style.articleCardsBlock}>
      <h2 className={style.h2SearchResultsPageArticles}>Список документов</h2>
      <div className={style.articleCards}>
        {articles.slice(0, displayedArticles).map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
      {displayedArticles < articles.length && (
        <div className={style.buttonDiv}>
          <button
            className={`${style.button} ${style.showMore}`}
            onClick={showMoreArticles}
          >
            Показать больше
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleCards;
