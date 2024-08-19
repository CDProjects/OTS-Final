import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Facebook, Twitter, Share } from 'lucide-react';

const ExpandableNewsArticle = ({ title, date, content, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncateTitle = (str, num) => {
    if (str.length <= num) return str;
    return str.slice(0, num) + '...';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'fi' ? 'fi-FI' : 'en-US', options);
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={toggleExpand}>
          {isExpanded ? (
            <ChevronDown className="mr-2" />
          ) : (
            <ChevronRight className="mr-2" />
          )}
          <h2 className="text-lg font-semibold">{truncateTitle(title, 50)}</h2>
        </div>
        <div className="flex space-x-2">
          <Facebook className="w-5 h-5 cursor-pointer" />
          <Twitter className="w-5 h-5 cursor-pointer" />
          <Share className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{formatDate(date)}</p>
      {isExpanded && <div className="mt-4">{content}</div>}
    </div>
  );
};

export default ExpandableNewsArticle;