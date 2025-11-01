import React from "react";

const BlogDetail = ({ blog }) => {
  console.log("status", blog);
  return (
    <div>
      {blog.data ? (
        <div>
          <div className="text-center">
            <p className="text-primary font-medium">
              Published on{" "}
              {new Date(blog.data.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto! py-4">
              {blog.data.title}
            </h1>
            <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
              {blog.data.author.username}
            </p>
          </div>
          <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
            <img
              className="rounded-3xl mb-5 mx-auto"
              src={blog.data.image}
              alt=""
            />
          </div>
          <div className="max-w-3xl mx-auto px-4 text-left text-foreground">
            <div dangerouslySetInnerHTML={{ __html: blog.data.content }}></div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-loader-circle animate-spin size-6"
            role="status"
            aria-label="Loading"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
