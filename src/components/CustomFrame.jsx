"use client"

import React, { useEffect, useState } from 'react'
import Frame, { FrameContextConsumer } from 'react-frame-component';
// import '../globals.css'; 

const CustomIframe = ({ children }) => {
  const [styles, setStyles] = useState('');

  useEffect(() => {
    // Get all style elements from the document head
    const styleElements = Array.from(document.getElementsByTagName('style'));
    console.log('Found style elements:', styleElements.length);
    
    // Log each style element's content
    styleElements.forEach((style, index) => {
      console.log(`Style ${index} content:`, style.innerHTML);
    });
    
    const combinedStyles = styleElements
      .map(style => style.innerHTML)
      .join('\n');
    
    console.log('Combined styles:', combinedStyles);
    setStyles(combinedStyles);
  }, []);

  return (
    <Frame 
      head={[
        <style key="styles" dangerouslySetInnerHTML={{ __html: styles }} />,
        // Let's also try adding the Tailwind classes directly
        <style key="tailwind-classes">
          {`
            .bg-blue-500 { background-color: rgb(59 130 246); }
            .text-white { color: rgb(255 255 255); }
            .p-4 { padding: 1rem; }
          `}
        </style>
      ]}
      initialContent='<!DOCTYPE html><html><head></head><body><div id="mountHere"></div></body></html>'
      style={{ width: '100%', height: '100%' }}
    >
      <FrameContextConsumer>
        {({ document, window }) => (
          <div>
            {children}
          </div>
        )}
      </FrameContextConsumer>
    </Frame>
  );
};

export default CustomIframe; 