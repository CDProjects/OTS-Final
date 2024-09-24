import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./News.css";
import FacebookPageWrapper from "./FacebookPageWrapper";
import ExpandableNewsArticle from "./ExpandNews";
import { articleData } from "./ArticleData";
import ErrorBoundary from "./ErrorBoundary";
import semiFinalImage from "../Images/GF.jpeg";

const News = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [containerWidth, setContainerWidth] = useState(500);
    const [expandedArticleId, setExpandedArticleId] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const articleId = searchParams.get('article');
        setExpandedArticleId(articleId || null);

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
    }, [location]);

    useEffect(() => {
        if (!isLoading && window.FB) {
            window.FB.XFBML.parse();
        }
    }, [isLoading, containerWidth]);

    const handleExpandArticle = (articleId) => {
        const newExpandedId = expandedArticleId === articleId ? null : articleId;
        setExpandedArticleId(newExpandedId);
        
        if (newExpandedId) {
            navigate(`/news?article=${newExpandedId}`, { replace: true });
        } else {
            navigate('/news', { replace: true });
        }
    };

    const getMetaTags = () => {
        return (
            <ErrorBoundary>
                <Helmet>
                    <title>Shamrocks News</title>
                    <meta property="og:title" content="Shamrocks News" />
                    <meta property="og:description" content="Latest news from Shamrocks" />
                    <meta property="og:url" content={`${window.location.origin}/news`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:image" content={`${window.location.origin}/path-to-default-image.jpg`} />
                </Helmet>
            </ErrorBoundary>
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
                    <div className="semi-final-image-container">
                        <img src={semiFinalImage} alt="Rugby SM Semi-Final" className="semi-final-image" />
                    </div>
                    <div className="fb-page-container">
                        <FacebookPageWrapper
                            fbPageUrl="https://www.facebook.com/OldTownShamrocks/"
                            tabs="timeline"
                            width={String(containerWidth)}
                            height="700"
                        />
                    </div>
                    <div style={{ maxWidth: '800px', margin: '32px auto', backgroundColor: '#000', padding: '16px' }}>
                        <h2 style={{ color: '#ffffff', marginBottom: '16px' }}>ARTICLES</h2>
                        <ExpandableNewsArticle
                            key={articleData.id}
                            id={articleData.id}
                            title={articleData.title}
                            date={articleData.date}
                            content={articleData.content}
                            language="fi"
                            images={articleData.images}
                            isExpanded={expandedArticleId === articleData.id}
                            onExpand={handleExpandArticle}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default News;