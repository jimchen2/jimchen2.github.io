import React, { useState, useEffect } from 'react';
import { marked } from 'marked'; // Updated import

const MarkdownViewer: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/jimchen2/docker-self-host/master/README.md');
        const text = await response.text();
        const htmlContent = marked.parse(text); // Use marked.parse instead of marked
        setContent(htmlContent);
      } catch (error) {
        console.error('Error fetching the Markdown file:', error);
        setContent('<p>Error loading the content. Please try again later.</p>');
      }
    };

    fetchMarkdown();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <style jsx>{`
        .container {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
          line-height: 1.6;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .markdown-body {
          box-sizing: border-box;
          min-width: 200px;
          max-width: 980px;
          margin: 0 auto;
          padding: 45px;
        }
        @media (max-width: 767px) {
          .markdown-body {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default MarkdownViewer;