import React from "react";
import { Helmet } from "react-helmet";
import ShareButtons from "./ShareButtons";
import { articleData } from './ArticleData';

const Article = () => {
  const articleUrl = `${window.location.origin}${window.location.pathname}`;

  return (
    <>
      <Helmet>
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={articleData.title} />
        <meta property="og:description" content={articleData.content.substring(0, 200) + '...'} />
        {/* Add an og:image tag here if you have a relevant image */}
      </Helmet>
      <div className="article">
        <h2>{articleData.title}</h2>
        <p>{articleData.content}</p>
        <ShareButtons url={articleUrl} title={articleData.title} />
      </div>
    </>
  );
};

export default Article;