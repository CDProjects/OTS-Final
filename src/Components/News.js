import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./News.css";
import FacebookPageWrapper from "./FacebookPageWrapper";
import ExpandableNewsArticle from "./ExpandNews";
import { articleData } from "./ArticleData";
import ErrorBoundary from "./ErrorBoundary";

const News = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [containerWidth, setContainerWidth] = useState(500);
    const [expandedArticleId, setExpandedArticleId] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const articleId = searchParams.get('article');
        const fromShare = searchParams.get('from') === 'share';

        if (articleId) {
            setExpandedArticleId(articleId);
        }

        if (fromShare) {
            setExpandedArticleId(articleId || 'shamrocks-rugby-2024');
            setTimeout(() => {
                const articleElement = document.getElementById(articleId || 'shamrocks-rugby-2024');
                if (articleElement) {
                    articleElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);

            searchParams.delete('from');
            navigate(location.pathname + '?' + searchParams.toString(), { replace: true });
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

    const handleExpandArticle = (articleId) => {
        setExpandedArticleId(articleId === expandedArticleId ? null : articleId);
        navigate(`/news?article=${articleId}`, { replace: true });
    };

    const getMetaTags = () => {
        let currentArticle = articleData; // Assuming articleData is an object with the article details.
    
        const articleUrl = `${window.location.origin}/news/${currentArticle.id || 'default-id'}`;
        const description = currentArticle.content && typeof currentArticle.content === 'string'
            ? currentArticle.content.substring(0, 200) + '...'
            : 'Latest news from Shamrocks';

            console.log('Meta title:', String(currentArticle.title || 'Shamrocks News'));
console.log('Meta description:', String(description));
console.log('Meta url:', String(articleUrl));
console.log('Meta image:', currentArticle.images && currentArticle.images[0] && String(currentArticle.images[0].src));
        
        return (
            <ErrorBoundary>
            <Helmet>
                <title>{String(currentArticle.title || 'Shamrocks News')} | Shamrocks News</title>
                <meta property="og:title" content={String(currentArticle.title || 'Shamrocks News')} />
                <meta property="og:description" content={String(description)} />
                <meta property="og:url" content={String(articleUrl)} />
                <meta property="og:type" content="article" />
                {currentArticle.images && currentArticle.images[0] && (
                    <>
                        <meta property="og:image" content={String(currentArticle.images[0].src)} />
                        <meta property="og:image:alt" content={String(currentArticle.images[0].alt || '')} />
                    </>
                )}
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
