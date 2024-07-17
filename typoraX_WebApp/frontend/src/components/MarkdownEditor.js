import React from 'react';

const MarkdownEditor = ({ markdownText, setMarkdownText }) => (
  <textarea
    value={markdownText}
    onChange={(e) => setMarkdownText(e.target.value)}
    placeholder="Enter your markdown here..."
  />
);

export default MarkdownEditor;
