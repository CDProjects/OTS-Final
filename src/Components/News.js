import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./News.css";
import FacebookPageWrapper from "./FacebookPageWrapper";
import ExpandableNewsArticle from "./ExpandNews";
import { articleData } from "./ArticleData";

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(500);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for article ID and 'from' parameter in URL
    const searchParams = new URLSearchParams(location.search);
    const articleId = searchParams.get("article");
    const fromShare = searchParams.get("from") === "share";

    if (articleId) {
      setExpandedArticleId(articleId);
    }

    if (fromShare) {
      // If coming from a share, expand the article and scroll to it
      setExpandedArticleId(articleId || "shamrocks-rugby-2024");
      setTimeout(() => {
        const articleElement = document.getElementById(
          articleId || "shamrocks-rugby-2024"
        );
        if (articleElement) {
          articleElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000); // Increased to 1000ms as suggested

      // Remove the 'from' parameter from the URL
      searchParams.delete("from");
      navigate(location.pathname + "?" + searchParams.toString(), {
        replace: true,
      });
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const handleResize = () => {
      const width = Math.min(500, window.innerWidth - 40);
      setContainerWidth(width);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [location, navigate]);

  useEffect(() => {
    if (!isLoading && window.FB) {
      window.FB.XFBML.parse();
    }
  }, [isLoading, containerWidth]);

  const getMetaTags = () => {
    return (
      <Helmet>
        <title>{articleData.title}</title>
        <meta property="og:title" content={articleData.title} />
        <meta
          property="og:description"
          content={articleData.content.slice(0, 200) + "..."}
        />
        <meta
          property="og:image"
          content={`https://shamrocks.fi${articleData.images[0].src}`}
        />
        <meta
          property="og:url"
          content={`https://shamrocks.fi/news?article=${articleData.id}`}
        />
        <meta property="og:type" content="article" />
      </Helmet>
    );
  };

  return (
    <div className="news-section">
      {getMetaTags()}
      <h1>NEWS</h1>
      {isLoading ? (
        <div className="custom-loader">
          <div className="spinner"></div>
          <p>Loading news feed...</p>
        </div>
      ) : (
        <>
          <div className="fb-page-container">
            <FacebookPageWrapper
              fbPageUrl="https://www.facebook.com/OldTownShamrocks/"
              tabs="timeline"
              width={containerWidth.toString()}
              height="700"
            />
          </div>
          <div
            style={{
              maxWidth: "800px",
              margin: "32px auto",
              backgroundColor: "#000",
              padding: "16px",
            }}
          >
            <h2 style={{ color: "#ffffff", marginBottom: "16px" }}>ARTICLES</h2>
            <ExpandableNewsArticle
              id={articleData.id}
              title={articleData.title}
              date={articleData.date}
              content={articleData.content}
              language="fi"
              images={articleData.images}
              isExpanded={expandedArticleId === articleData.id}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default News;
