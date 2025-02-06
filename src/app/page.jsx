"use client"
import CustomIframe from '../components/CustomFrame';
import MyComponent from '../components/MyComponent';
import { Button } from "@/components/ui/button"
import FrameWithStyles from '../components/ReactFrame';
import { Component as BarChart } from '../components/BarChart';
import { ResizableBox } from 'react-resizable';

export default function Home() {  
  return (
    <>
      {/* <div className="bg-blue-500 text-white p-4">
        <p>Testing to see if tailwind works!</p>
      </div> */}
      {/* <CustomIframe title="A custom made iframe">
        <MyComponent />
        
      </CustomIframe> */}
      <FrameWithStyles />
      
      {/* <ResizableBox width={200} height={200}>
        <BarChart />
      </ResizableBox> */}
    </>
  );

}
