import React, { useState, useEffect } from 'react';
import './News.css';
import FacebookPageWrapper from './FacebookPageWrapper';
import ExpandableNewsArticle from './ExpandNews';

// Import the article data directly, not the component
import { articleData } from './ArticleData';

const News = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [containerWidth, setContainerWidth] = useState(500);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        const handleResize = () => {
            const width = Math.min(500, window.innerWidth - 40);
            setContainerWidth(width);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!isLoading && window.FB) {
            window.FB.XFBML.parse();
        }
    }, [isLoading, containerWidth]);

    return (
        <div className="news-section">
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
                    <div className="max-w-3xl mx-auto mt-8">
                        <ExpandableNewsArticle
                            title={articleData.title}
                            date={articleData.date}
                            content={articleData.content}
                            language="fi"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default News;