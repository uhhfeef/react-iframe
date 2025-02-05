import React from "react";
import { Button } from "../../components/ui/button"

function MyComponent() {
  return (
    <>
      <div className="bg-blue-500 text-white p-4">
        <p>Testing to see if my component renders!</p>
      </div>
      <Button variant="destructive" className="">Shadcn Button</Button>
    </>
  );
}

export default MyComponent;