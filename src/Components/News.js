import React, { useState, useEffect } from 'react';
import './News.css';
import FacebookPageWrapper from './FacebookPageWrapper';

const News = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [containerWidth, setContainerWidth] = useState(500); // Default width

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        const handleResize = () => {
            const width = Math.min(500, window.innerWidth - 40); // 20px padding on each side
            setContainerWidth(width);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial size

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
                <div className="fb-page-container">
                    <FacebookPageWrapper 
                        fbPageUrl="https://www.facebook.com/OldTownShamrocks/"
                        tabs="timeline"
                        width={containerWidth.toString()}
                        height="700"
                    />
                </div>
            )}
        </div>
    );
};

export default News;