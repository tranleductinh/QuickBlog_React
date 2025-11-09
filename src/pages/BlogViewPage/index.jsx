import BlogDetail from "@/components/BlogDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "@/services/api/blog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BlogViewPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const response = await getDetails(id);
      console.log(response);
      setBlog(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      navigate("/");
    }
  };
  console.log("blog", blog);
  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
};

export default BlogViewPage;
