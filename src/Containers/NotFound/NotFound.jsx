import React from "react";
import notFound from "../../Assets/notFound.webp";

export default function NotFound() {
  return (
    <div className="w-full h-full">
      <>
        <div className="w-full p-4 m-4">
          <img
            className="lg:w-3/5 md:w-4/5 sm:w-full mx-auto"
            src={notFound}
            alt=""
          />
        </div>
      </>
    </div>
  );
}
