import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown, Facebook, Twitter, Instagram, Share2 } from 'lucide-react';
import './ExpandNews.css';

const ExpandableNewsArticle = ({ id, title, date, content, language, images }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedTitle, setTruncatedTitle] = useState(title);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `Published ${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  useEffect(() => {
    const truncateTitle = () => {
      const titleElement = titleRef.current;
      const containerElement = containerRef.current;
      if (titleElement && containerElement) {
        const maxWidth = containerElement.offsetWidth - 150;
        let text = title;
        titleElement.textContent = text;
        
        while (titleElement.offsetWidth > maxWidth && text.length > 0) {
          text = text.slice(0, -1);
          titleElement.textContent = text + '...';
        }
        
        setTruncatedTitle(titleElement.textContent);
      }
    };

    truncateTitle();
    window.addEventListener('resize', truncateTitle);
    return () => window.removeEventListener('resize', truncateTitle);
  }, [title]);

  const renderContent = () => {
    const contentParagraphs = content.split('\n\n');
    const result = [];

    contentParagraphs.forEach((paragraph, index) => {
      result.push(<p key={`p-${index}`}>{paragraph}</p>);
      
      if (images && images[Math.floor(index / 2)] && (index + 1) % 2 === 0) {
        const image = images[Math.floor(index / 2)];
        result.push(
          <img
            key={`img-${Math.floor(index / 2)}`}
            src={image.src}
            alt={image.alt}
            className="article-image"
          />
        );
      }
    });

    return result;
  };

  const shareOnFacebook = () => {
    const articleUrl = encodeURIComponent(`${window.location.origin}/news?article=${id}`);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`;
    
    if (process.env.NODE_ENV === 'production') {
      window.open(shareUrl, 'FacebookShare', 'width=626,height=436');
    } else {
      console.log('Facebook share URL (for testing):', shareUrl);
      alert('In development, this would open a Facebook share dialog. For local testing, check the console for the share URL.');
    }
  };


  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnInstagram = () => {
    const message = `Check out this article: ${title}\n\n${window.location.href}`;
    copyToClipboard(message);
    alert("Link and title copied to clipboard. You can now paste this into your Instagram post.");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: content.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard(window.location.href);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    });
  };

  return (
    <div className={`expandable-article ${isExpanded ? 'expanded' : ''}`} ref={containerRef}>
      <div className="article-header" onClick={toggleExpand}>
        <div className="title-section">
          <div className="icon">
            {isExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          </div>
          <div className="text-container">
            <h2 className="title" ref={titleRef}>{truncatedTitle}</h2>
            <span className="date">{formatDate(date)}</span>
          </div>
        </div>
        <div className="share-icons">
          <Facebook size={20} onClick={(e) => { e.stopPropagation(); shareOnFacebook(); }} />
          <Twitter size={20} onClick={(e) => { e.stopPropagation(); shareOnTwitter(); }} />
          <Instagram size={20} onClick={(e) => { e.stopPropagation(); shareOnInstagram(); }} />
          <Share2 size={20} onClick={(e) => { e.stopPropagation(); handleShare(); }} />
          {showCopiedMessage && <span className="copied-message">Link copied!</span>}
        </div>
      </div>
      {isExpanded && (
        <div className="article-content">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default ExpandableNewsArticle;