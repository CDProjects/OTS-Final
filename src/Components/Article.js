import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { articleData } from './ArticleData';

const Article = () => {
    const { articleId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const article = articleData[articleId] || articleData;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const fromShare = searchParams.get('from') === 'share';

        if (fromShare) {
            navigate(`/news?article=${articleId}`, { replace: true });
        }
    }, [location, articleId, navigate]);

    if (!article) {
        return <div>Article not found</div>;
    }

    const shareOnFacebook = () => {
        const articleUrl = encodeURIComponent(`https://shamrocks.fi/#/news/${articleId}?from=share`);
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`;
        window.open(shareUrl, 'FacebookShare', 'width=626,height=436');
    };

    const fullImageUrl = window.location.origin + article.images[0].src;

    return (
        <div className="article">
            <Helmet>
                <title>{article.title}</title>
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.content.slice(0, 200) + '...'} />
                <meta property="og:image" content={fullImageUrl} />
                <meta property="og:url" content={`https://shamrocks.fi/#/news/${articleId}`} />
                <meta property="og:type" content="article" />
            </Helmet>
            <h1>{article.title}</h1>
            <img src={article.images[0].src} alt={article.images[0].alt} />
            <p>{article.content}</p>
            <button onClick={shareOnFacebook}>Share on Facebook</button>
        </div>
    );
};

export default Article;