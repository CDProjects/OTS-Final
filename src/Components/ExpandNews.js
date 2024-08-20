import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet";
import "./ExpandNews.css";

const ExpandableNewsArticle = ({
  id,
  title,
  date,
  content,
  language,
  images,
  isExpanded,
  onExpand,
}) => {
  const [truncatedTitle, setTruncatedTitle] = useState(title);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const shareButtonsRef = useRef(null);

  const toggleExpand = () => {
    onExpand(id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `Published ${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;
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
          titleElement.textContent = text + "...";
        }
        setTruncatedTitle(titleElement.textContent);
      }
    };
    truncateTitle();
    window.addEventListener("resize", truncateTitle);
    return () => window.removeEventListener("resize", truncateTitle);
  }, [title]);

  useEffect(() => {
    const loadShareButtons = () => {
      if (window.__sharethis__ && shareButtonsRef.current) {
        window.__sharethis__.load('inline-share-buttons', {
          container: shareButtonsRef.current,
          alignment: 'center',
          networks: ['facebook', 'twitter', 'email', 'sms', 'sharethis']
        });
      }
    };

    // Wait for the DOM to be fully loaded
    if (document.readyState === 'complete') {
      loadShareButtons();
    } else {
      window.addEventListener('load', loadShareButtons);
      return () => window.removeEventListener('load', loadShareButtons);
    }
  }, []);

  useEffect(() => {
    const loadShareButtons = () => {
      if (window.__sharethis__ && shareButtonsRef.current) {
        setTimeout(() => {
          window.__sharethis__.load('inline-share-buttons', {
            container: shareButtonsRef.current,
            alignment: 'center',
            networks: ['facebook', 'twitter', 'email', 'sms', 'sharethis']
          });
        }, 100); // Small delay to ensure DOM is ready
      }
    };
  
    if (document.readyState === 'complete') {
      loadShareButtons();
    } else {
      window.addEventListener('load', loadShareButtons);
      return () => window.removeEventListener('load', loadShareButtons);
    }
  }, [isExpanded]); // Re-run when isExpanded changes

  const renderContent = () => {
    const contentParagraphs = content.split("\n\n");
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

  return (
    <div
      className={`expandable-article ${isExpanded ? "expanded" : ""}`}
      ref={containerRef}
    >
      <Helmet>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.substring(0, 200) + '...'} />
        <meta property="og:image" content={images[0].src} />
        <meta property="og:url" content={`${window.location.origin}/news/${id}`} />
        <meta property="og:type" content="article" />
      </Helmet>
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
            <h2 className="title" ref={titleRef}>
              {truncatedTitle}
            </h2>
            <span className="date">{formatDate(date)}</span>
          </div>
        </div>
        <div className="share-icons" ref={shareButtonsRef}></div>
      </div>
      {isExpanded && (
        <div className="article-content">
          {renderContent()}
          <div ref={shareButtonsRef}></div>
        </div>
      )}
    </div>
  );
};

export default ExpandableNewsArticle;