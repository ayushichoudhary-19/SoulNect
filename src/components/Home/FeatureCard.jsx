import React from "react";
const handleFeatureClick = (link) => {
    window.location
    .assign(link);
}

export default function FeatureCard({ link, icon, title, description }) {
  return (
    <div className="hover:cursor-pointer grid grid-cols-1 align-center px-3 py-3 text-center"
    onClick={() => {handleFeatureClick(link)}}
    >
      <div className="flex items-center justify-center mb-3">
        <img
          className="w-1/5 sm:w-1/5 md:w-1/3 lg:w-1/4 xl:w-1/5 my-2"
          src={icon}
          alt={title}
          loading="lazy"
        />
      </div>
      <h1
        className="text-black font-bold"
      >
        {title}
      </h1>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
