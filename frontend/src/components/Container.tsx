import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center mb-8">
        {children}
      </div>
    </div>
  );
};

export default Container;
