import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import BlogOverview from "@/components/BlogOverview";
import {getBlogs}  from "@/services/api/blog";

const HomePage = () => {
  const [data, getData] = useState([]);
  const [dataFilter, getDataFilter] = useState([]);
  const [search, setSearch] = useState(null);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setNotFound(false);
        const response = await getBlogs();
        console.log(response);
        getData(response.data.items);
        getDataFilter(response.data.items);
      } catch (error) {
        setNotFound(true);
        console.error(error);
      }
    };
    fetch();
  }, []);
  console.log("search", search);
  const handleSearch = () => {
    setNotFound(false);
    if (search !== null) {
      const newData = data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
      if(newData.length === 0) {
        setNotFound(true)
        return
      }
      getDataFilter(
        data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setNotFound(false)
      getDataFilter(data);
    }
  };
  console.log("data", data);
  return (
    <>
      <div className="text-center mt-10 mb-8">
        <h1 className="text-3xl! sm:text-6xl! font-semibold! sm:leading-16! text-gray-700 m-0!">
          Your own
          <span className="text-primary"> blogging</span>
          <br />
          platform.
        </h1>
        <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-gray-500">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>
        <div className="flex bg-card justify-between items-center max-w-lg max-sm:scale-75 mx-auto border border-gray-300 rounded overflow-hidden">
          <input
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-4 h-9 bg-transparent outline-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground text-base md:text-sm"
            placeholder="Enter search title"
          />
          <Button
            onClick={() => handleSearch()}
            type="button"
            className="m-1.5 px-8 py-2 rounded"
          >
            Search
          </Button>
        </div>
      </div>

      <BlogOverview data={dataFilter} notFound={notFound} />
    </>
  );
};

export default HomePage;
