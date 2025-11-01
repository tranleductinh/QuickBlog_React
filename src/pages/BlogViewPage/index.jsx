import BlogDetail from "@/components/BlogDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api";
import { getDetails } from "@/services/api/blog";

const BlogViewPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getDetails(id);
        console.log(response);
        setBlog(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  console.log("blog", blog);
  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
};

export default BlogViewPage;
