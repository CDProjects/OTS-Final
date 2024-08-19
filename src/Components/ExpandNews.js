import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown, Facebook, Twitter, Share } from 'lucide-react';
import './ExpandNews.css';

const ExpandableNewsArticle = ({ title, date, content, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedTitle, setTruncatedTitle] = useState(title);
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
        const maxWidth = containerElement.offsetWidth - 150; // Adjust for icon and share buttons
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

  return (
    <div className="expandable-article" ref={containerRef}>
      <div className="article-header" onClick={toggleExpand}>
        <div className="title-section">
          <div className="icon">
            {isExpanded ? (
              <ChevronDown size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
          </div>
          <div className="text-container">
            <h2 className="title" ref={titleRef}>{truncatedTitle}</h2>
            <span className="date">{formatDate(date)}</span>
          </div>
        </div>
        <div className="share-icons">
          <Facebook size={20} />
          <Twitter size={20} />
          <Share size={20} />
        </div>
      </div>
      {isExpanded && (
        <div className="article-content">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpandableNewsArticle;