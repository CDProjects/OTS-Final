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
    <div className={`border border-gray-200 rounded-lg p-4 mb-4 ${isExpanded ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-grow cursor-pointer" onClick={toggleExpand}>
          <div className="mr-4">
            {isExpanded ? (
              <ChevronDown className="w-6 h-6 text-gray-500" />
            ) : (
              <ChevronRight className="w-6 h-6 text-gray-500" />
            )}
          </div>
          <h2 className="text-lg font-semibold flex-grow">{truncateTitle(title, 50)}</h2>
        </div>
        <div className="flex space-x-2 ml-4">
          <Facebook className="w-5 h-5 cursor-pointer text-blue-600" />
          <Twitter className="w-5 h-5 cursor-pointer text-blue-400" />
          <Share className="w-5 h-5 cursor-pointer text-gray-500" />
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">{formatDate(date)}</p>
      {isExpanded && <div className="mt-4">{content}</div>}
    </div>
  );
};

export default ExpandableNewsArticle;