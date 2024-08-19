import React, { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, WhatsappIcon } from 'react-share';
import { FaShareAlt, FaCopy, FaInstagram } from 'react-icons/fa';

const XIcon = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#fff"/>
  </svg>
);

const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleMobileShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="share-buttons">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <div className="custom-icon-wrapper">
          <XIcon size={24} />
        </div>
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <a href="https://www.instagram.com/oldtownshamrocks/" target="_blank" rel="noopener noreferrer" className="custom-icon-wrapper">
        <FaInstagram size={24} />
      </a>
      <button onClick={handleCopyLink} className="custom-icon-wrapper">
        <FaCopy size={20} />
      </button>
      <button onClick={handleMobileShare} className="custom-icon-wrapper mobile-share">
        <FaShareAlt size={20} />
      </button>
      {copied && <span className="copied-message">Link copied!</span>}
    </div>
  );
};

export default ShareButtons;