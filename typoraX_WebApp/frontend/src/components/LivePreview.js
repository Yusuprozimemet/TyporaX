import React from 'react';
import { marked } from 'marked';

const LivePreview = ({ markdownText }) => {
  const getMarkdownText = () => {
    const rawMarkup = marked(markdownText, { sanitize: true });
    return { __html: rawMarkup };
  };

  return (
    <div
      className="live-preview"
      dangerouslySetInnerHTML={getMarkdownText()}
    />
  );
};

export default LivePreview;
