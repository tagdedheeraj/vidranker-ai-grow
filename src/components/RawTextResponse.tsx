
import { useEffect } from 'react';

interface RawTextResponseProps {
  content: string;
  contentType?: string;
}

const RawTextResponse = ({ content, contentType = 'text/plain' }: RawTextResponseProps) => {
  useEffect(() => {
    // Remove all existing styles and make it look like raw text
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.fontFamily = 'monospace';
    document.body.style.fontSize = '14px';
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    
    // Set content type meta tag
    let metaTag = document.querySelector('meta[http-equiv="Content-Type"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('http-equiv', 'Content-Type');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', `${contentType}; charset=utf-8`);
    
    // Cleanup function
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.fontFamily = '';
      document.body.style.fontSize = '';
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [contentType]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'white',
      color: 'black',
      fontFamily: 'monospace',
      fontSize: '14px',
      margin: 0,
      padding: '10px',
      overflow: 'auto',
      zIndex: 9999
    }}>
      <pre style={{ margin: 0, padding: 0, whiteSpace: 'pre' }}>
        {content}
      </pre>
    </div>
  );
};

export default RawTextResponse;
