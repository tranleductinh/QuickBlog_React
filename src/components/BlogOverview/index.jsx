import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";
import YoutubeFresh from "../Loaders/YoutubeFresh";

const BlogOverview = ({data, notFound}) => {
  
  if (notFound) {
    return (
      <div className="min-h-[200px]">
        <div className="w-1/2 mx-auto">
          <Lottie animationData={loading} loop={true}></Lottie>
        </div>
        <p className="text-center text-gray-500 text-xl font-medium mb-1">
          We cound not find any blog
        </p>
        <p className="text-center text-gray-500 text-xs">
          Please try again with a different search query.
        </p>
      </div>
    );
  }
  return (
    <>
      {data.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          <div>
            <YoutubeFresh />
          </div>
          <div>
            <YoutubeFresh />
          </div>
          <div>
            <YoutubeFresh />
          </div>
          <div>
            <YoutubeFresh />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.map((item) => (
            <div>
              <Link to={`/blog-detail/${item._id}`} className="grid h-full">
                <div className="shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-[1.02]">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 bg-card">
                    <div className="flex gap-2 mb-2">
                      {item.tags.map((tag) => (
                        <span className="flex items-center justify-center  px-2 py-0.5 text-xs font-medium text-primary bg-[#dcdafa] rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h5 className="text-lg font-semibold mb-2 text-ellipsis whitespace-nowrap overflow-hidden">
                      {item.title}
                    </h5>
                    <p className="text-foreground mb-2 text-xs overflow-hidden">
                      {item.content.replace(/<[^>]+>/g, '').slice(0, 100) + " ..."}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogOverview;
