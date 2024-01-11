import React from "react";

const ResponsiveComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-5xl p-4 mx-4 bg-gray-300 rounded-lg shadow-md h-50 md:p-8">
        <h1 className="mb-4 text-2xl font-bold text-center md:text-3xl lg:text-4xl">
          Component Header
        </h1>

        <div className="mb-4">
          <p className="text-lg font-semibold md:text-xl lg:text-2xl">
            Component Title
          </p>
        </div>

        <div className="text-gray-700">
          <p className="text-sm leading-7 md:text-base lg:text-lg">
            This is a long message that explains the details of the component.
            It can be as long as needed and will remain responsive on both
            mobile and laptop screens. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sapiente aliquid, sint voluptate repellendus
            facilis sunt consequatur blanditiis nisi quo nemo in porro
            repudiandae mollitia officiis. Voluptatibus in ipsam numquam
            accusantium.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveComponent;
