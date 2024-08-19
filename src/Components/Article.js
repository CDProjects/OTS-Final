import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { articleData } from './ArticleData';

const Article = () => {
    const { articleId } = useParams();
    
    // In a real app, you'd fetch the article data based on articleId
    // For now, we'll just use the static articleData

    const fullImageUrl = window.location.origin + articleData.images[0].src;

    return (
        <div className="article">
            <Helmet>
                <title>{articleData.title}</title>
                  <meta property="og:title" content={articleData.title} />
                  <meta property="og:description" content={articleData.content.slice(0, 200) + '...'} />
                  <meta property="og:image" content={fullImageUrl} />
                  <meta property="og:url" content={`https://shamrocks.fi/news/${articleId}`} />
                  <meta property="og:type" content="article" />
            </Helmet>
            <h1>{articleData.title}</h1>
            <img src={articleData.images[0].src} alt={articleData.images[0].alt} />
            <p>{articleData.content}</p>
            {/* Add sharing buttons here */}
        </div>
    );
};

export default Article;