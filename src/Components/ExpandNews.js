import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Facebook, Twitter, Share } from 'lucide-react';
import './ExpandNews.css';

const ExpandableNewsArticle = ({ title, date, content, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncateTitle = (str, num) => {
    if (str.length <= num) return str;
    return str.slice(0, num) + '...';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `Published ${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  return (
    <div className={`expandable-article ${isExpanded ? 'expanded' : ''}`}>
      <div className="article-header">
        <div className="title-section" onClick={toggleExpand}>
          <div className="icon">
            {isExpanded ? (
              <ChevronDown size={24} />
            ) : (
              <ChevronRight size={24} />
            )}
          </div>
          <div className="text-container">
            <h2 className="title">{truncateTitle(title, 50)}</h2>
            <span className="date">{formatDate(date)}</span>
          </div>
        </div>
        <div className="share-icons">
          <Facebook size={20} />
          <Twitter size={20} />
          <Share size={20} />
        </div>
      </div>
      {isExpanded && <div className="article-content">{content}</div>}
    </div>
  );
};

export default ExpandableNewsArticle;