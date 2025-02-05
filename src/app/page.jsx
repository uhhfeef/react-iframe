import CustomIframe from './components/CustomFrame';
import MyComponent from './components/MyComponent';
import { Button } from "@/components/ui/button"
import FrameWithStyles from './components/ReactFrame';

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
      <Button variant="destructive">Shadcn Button (Destructive)</Button>
    </>
  );

}
