import React, { useState, useEffect } from 'react';
import './News.css';
import FacebookPageWrapper from './FacebookPageWrapper';
import ExpandableNewsArticle from './ExpandNews';
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
                    <div style={{ maxWidth: '800px', margin: '32px auto', backgroundColor: '#000', padding: '16px' }}>
                        <h2 style={{ color: '#ffffff', marginBottom: '16px' }}>ARTICLES</h2>
                        <ExpandableNewsArticle
                            title={articleData.title}
                            date={articleData.date}
                            content={articleData.content}
                            language="fi"
                            images={articleData.images}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default News;