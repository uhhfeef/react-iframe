"use client"

import { useEffect, useState } from 'react';
import Frame from 'react-frame-component';
import { Button } from "@/components/ui/button"
import { Component as BarChart } from './BarChart';
import { ResponsiveContainer } from 'recharts';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';


const resizableStyles = `
.react-resizable {
  position: relative;
}
.react-resizable-handle {
  position: absolute;
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgaWQ9IlNWR1JlcG9fYmdDYXJyaWVyIiBzdHJva2Utd2lkdGg9IjAiPjwvZz48ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvZz48ZyBpZD0iU1ZHUmVwb19pY29uQ2FycmllciI+IDxwYXRoIGQ9Ik0yMSAxNUwxNSAyMU0yMSA4TDggMjEiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4gPC9nPjwvc3ZnPg==');
  background-position: bottom right;
  padding: 0 3px 3px 0;
}
.hover-handles .react-resizable-handle {
  opacity: 0;
}
.hover-handles:hover .react-resizable-handle {
  opacity: 0.6;
}
.hover-handles:hover .react-resizable-handle:hover {
  opacity: 1;
  cursor: se-resize;
}
.react-resizable-handle-sw {
  bottom: 0;
  left: 0;
  cursor: sw-resize;
  transform: rotate(90deg);
}
.react-resizable-handle-se {
  bottom: 0;
  right: 0;
  cursor: se-resize;
}
.react-resizable-handle-nw {
  top: 0;
  left: 0;
  cursor: nw-resize;
  transform: rotate(180deg);
}
.react-resizable-handle-ne {
  top: 0;
  right: 0;
  cursor: ne-resize;
  transform: rotate(270deg);
}
.react-resizable-handle-w,
.react-resizable-handle-e {
  top: 50%;
  margin-top: -10px;
  cursor: ew-resize;
}
.react-resizable-handle-w {
  left: 0;
  transform: rotate(135deg);
}
.react-resizable-handle-e {
  right: 0;
  transform: rotate(315deg);
}
.react-resizable-handle-n,
.react-resizable-handle-s {
  left: 50%;
  margin-left: -10px;
  cursor: ns-resize;
}
.react-resizable-handle-n {
  top: 0;
  transform: rotate(225deg);
}
.react-resizable-handle-s {
  bottom: 0;
  transform: rotate(45deg);
}`;

const FrameWithStyles = () => {
  const [mounted, setMounted] = useState(false);
  const [nextStyles, setNextStyles] = useState('');

  useEffect(() => {
    const styleLink = document.querySelector('link[rel="stylesheet"]');
    console.log('Style link:', styleLink);
    if (styleLink) {
      fetch(styleLink.href)
        .then(response => response.text())
        .then(css => {
          console.log('Loaded Next.js styles:', css.slice(0, 100) + '...');
          setNextStyles(css);
        })
        .catch(error => console.error('Failed to load Next.js styles:', error));
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="w-full border border-neutral-200 rounded-lg p-4">
      <Frame
        style={{
          width: '100%',
          height: '100vh',
          border: '2px solid #e2e8f0',
          borderRadius: '8px',
        }}
        head={[
          // Inject Next.js styles
          <style key="next-styles" dangerouslySetInnerHTML={{ __html: nextStyles }} />,
          // Inject resizable styles
          <style key="resizable-styles" dangerouslySetInnerHTML={{ __html: resizableStyles }} />,
        ]}
        initialContent='<!DOCTYPE html><html><head></head><body><div id="mountHere"></div></body></html>'
      >
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-blue-600">Hello from Frame (Testing Tailwind and ShadCN inside Iframe)!</h1>
          <div className="space-x-4">
            <Button variant="destructive">Shadcn Button (Destructive)</Button>
            <Button variant="outline">Shadcn Button (Outline)</Button>
            <Button variant="default">Shadcn Button (default)</Button>
            <Button variant="secondary">Shadcn Button (Secondary)</Button>
            <Button variant="ghost">Shadcn Button (Ghost)</Button>
            <Button variant="link">Shadcn Button (Link)</Button>
          </div>
          <div className="relative" style={{ width: '100%', display: 'inline-block' }}>
            <ResizableBox 
              className="react-resizable hover-handles" 
              width={600}
              height={400}
              minConstraints={[200, 200]} 
              maxConstraints={[1200, 800]}
              resizeHandles={[ 'se']}
              lockAspectRatio={false}
              style={{ display: 'inline-block' }}
            >
              <div style={{ width: '100%', height: '100%' }}>
                <BarChart />
              </div>
            </ResizableBox>
          </div>
        </div>
      </Frame>
    </div>
  );
};

export default FrameWithStyles;