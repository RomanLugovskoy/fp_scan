import { useEffect, useState } from "react";
import style from "../../SearchResults.module.scss";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function cleanHtmlContent(htmlContent) {
  const decodedHtml = decodeHtml(htmlContent);
  const cleanedContent = decodedHtml.replace(/(<([^>]+)>)/gi, "");
  return cleanedContent;
}

const ArticleCard = (props) => {
  const [cleanContent, setCleanContent] = useState("");

  useEffect(() => {
    setCleanContent(cleanHtmlContent(props.content));
  }, [props.content]);

  const tagLabel = props.isTechNews
    ? "Технические новости"
    : props.isAnnouncement
    ? "Анонсы и события"
    : "Сводки новостей";

  const getWordForm = (count) => {
    const lastDigit = count.toString().slice(-1);
    const lastTwoDigits = count.toString().slice(-2);

    if (lastDigit === "1" && lastTwoDigits !== "11") {
      return "слово";
    } else if (
      lastDigit >= "2" &&
      lastDigit <= "4" &&
      lastTwoDigits !== "12" &&
      lastTwoDigits !== "13" &&
      lastTwoDigits !== "14"
    ) {
      return "слова";
    } else {
      return "слов";
    }
  };

  return (
    <div className={style.articleCard}>
      <div className={style.articleInfo}>
        <span className={style.articleDate}>{props.date}</span>
        <a href={props.url} className={style.articleSource} target="_blank">
          {props.sourceName}
        </a>
      </div>
      <h3 className={style.articleTitle}>{props.title}</h3>
      <div className={style.tag}>{tagLabel}</div>
      <img src={props.picture} alt="Article" className={style.articlePicture} />
      <p className={style.articleContent}>{cleanContent}</p>
      <div className={style.articleFooter}>
        <a
          href={props.url}
          className={`${style.button} ${style.readMore}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Читать в источнике
        </a>
        <span className={style.wordCount}>
          {props.wordCount} {getWordForm(props.wordCount)}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
