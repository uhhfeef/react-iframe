"use client"

import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Frame from 'react-frame-component';
import { Button } from "@/components/ui/button"
import { Component as BarChart } from '../app/components/BarChart';
import { ResponsiveContainer } from 'recharts';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { MyFirstGrid } from '../app/components/Grid';
import { Separator } from "@/components/ui/separator"

// Grid layout styles
const gridLayoutStyles = `
.react-grid-layout {
  position: relative;
  transition: height 200ms ease;
}
.react-grid-item {
  transition: all 200ms ease;
  transition-property: left, top, width, height;
}
.react-grid-item img {
  pointer-events: none;
  user-select: none;
}
.react-grid-item.cssTransforms {
  transition-property: transform, width, height;
}
.react-grid-item.resizing {
  transition: none;
  z-index: 1;
  will-change: width, height;
}
.react-grid-item.react-draggable-dragging {
  transition: none;
  z-index: 3;
  will-change: transform;
}
.react-grid-item.dropping {
  visibility: hidden;
}
.react-grid-item.react-grid-placeholder {
  background: lightgrey;
  opacity: 0.2;
  transition-duration: 100ms;
  z-index: 2;
  user-select: none;
}
.react-grid-item > .react-resizable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  cursor: se-resize;
  opacity: 0;
  transition: opacity 0.2s;
}

.react-grid-item:hover > .react-resizable-handle {
  opacity: 1;
}
  height: 20px;
}
`;

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
  opacity: 0;
  transition: opacity 0.2s ease;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgaWQ9IlNWR1JlcG9fYmdDYXJyaWVyIiBzdHJva2Utd2lkdGg9IjAiPjwvZz48ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvZz48ZyBpZD0iU1ZHUmVwb19pY29uQ2FycmllciI+IDxwYXRoIGQ9Ik0yMSAxNUwxNSAyMU0yMSA4TDggMjEiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD4gPC9nPjwvc3ZnPg==');
  background-position: bottom right;
  padding: 0 3px 3px 0;
}
.hover-handles .react-resizable-handle {
  opacity: 0.6;
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
  const nodeRef = useRef(null);
  const { theme } = useTheme();

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
          padding: '20px',
          borderRadius: '8px',
        }}
        head={[
          // Inject Next.js styles
          <style key="next-styles" dangerouslySetInnerHTML={{ __html: nextStyles }} />,
          // Inject resizable styles
          <style key="resizable-styles" dangerouslySetInnerHTML={{ __html: resizableStyles }} />,
          // Inject grid layout styles
          <style key="grid-layout-styles" dangerouslySetInnerHTML={{ __html: gridLayoutStyles }} />,
        ]}
        initialContent='<!DOCTYPE html><html><head></head><body><div id="mountHere"></div></body></html>'
      >
        <ThemeProvider attribute="class" defaultTheme="dark" >
          <div className="p-6 space-y-4">
          {/* <h1 className="text-3xl font-bold text-blue-600">Hello from Frame ()!</h1> */}
          <div className="space-y-1">
            <h4 className=" font-medium leading-none">Hello from iFrame</h4>
            <p className="text-sm text-muted-foreground">
            Testing Tailwind and ShadCN inside Iframe.
            </p>
          </div>
          <Separator className="my-4" />

          <div className="space-x-4">
            <Button variant="destructive">Button (Destructive)</Button>
            <Button variant="outline">Button (Outline)</Button>
            <Button variant="default">Button (default)</Button>
            <Button variant="secondary">Button (Secondary)</Button>
            <Button variant="ghost">Button (Ghost)</Button>
            <Button variant="link">Button (Link)</Button>
          </div>
          <div className="my-4">
            <MyFirstGrid />
          </div>
          <div className="relative" style={{ width: '100%', display: 'inline-block' }}>
            {/* <Draggable
              nodeRef={nodeRef}
              axis="x"
              handle=".handle"
              defaultPosition={{x: 0, y: 0}}
              position={null}
              grid={[25, 25]}
              scale={1}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}      
            > */}
              {/* <ResizableBox
                ref={nodeRef}
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
              </ResizableBox> */}
            {/* </Draggable> */}
          </div>
        </div>
          </ThemeProvider>
      </Frame>
    </div>
  );
};

export default FrameWithStyles;