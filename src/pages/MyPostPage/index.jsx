import { deleteBlog, getBlogs } from "@/services/api/blog";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import DialogConfirm from "@/components/DialogConfirm";
import toast from "react-hot-toast";
import AuthContext from "@/contexts/authContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cleanHtml } from "@/until/cleanHtml";
import he from "he";

const MyPostPage = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [open, setOpenChange] = useState(false);
  const [dataPost, setDataPost] = useState({});
  const handleOpenChange = ({ id, title }) => {
    setOpenChange(!open);
    setDataPost({ id, title });
  };
  const handleDelete = async (id) => {
    try {
      setOpenChange(false);
      await deleteBlog(id);
      setPost(post.filter((item) => item._id !== id));
      console.log("newPost", post);
      toast.success("Xóa thành công");
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
  };
  const fetch = async () => {
    try {
      setLoading(true);
      const response = await getBlogs();
      console.log("response", response.data.items);
      setPost(
        response.data.items.filter(
          (item) => item.author.email === userInfo.user.email
        )
      );
    } catch (error) {
      console.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
    console.log("post", post);
  }, []);

  return (
    <div className="overflow-auto">
      <h2 className="text-3xl sm:!text-5xl !font-semibold sm:!leading-[4rem] text-primary text-center mt-10 mb-8">
        ✍️ My Post
      </h2>
      <Table className="w-[1240px] mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-2">TTILE</TableHead>
            <TableHead>CONTENT</TableHead>
            <TableHead className="text-left w-2">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading === true ? (
            <TableRow>
              <TableCell className="" colSpan={3}>
                <div className="mx-auto w-5 min-h-[50vh] flex items-center justify-center">
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
              </TableCell>
            </TableRow>
          ) : (
            <>
              {post.length === 0 ? (
                <TableRow>
                  <TableCell className="" colSpan={3}>
                    <div className="mx-auto w-5 min-h-[50vh] flex items-center justify-center">
                      You have no posts yet
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                post.map((item) => (
                  <TableRow>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="overflow-hidden max-w-[20px] text-ellipsis whitespace-nowrap">{he.decode(cleanHtml(item.content))} ...</TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger>
                            <Link to={`/blog-details/${item._id}`}>
                              <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
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
                                  class="tabler-icon tabler-icon-binoculars w-5 h-5"
                                >
                                  <path d="M7 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                  <path d="M17 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                  <path d="M16.346 9.17l-.729 -1.261c-.16 -.248 -1.056 -.203 -1.117 .091l-.177 1.38"></path>
                                  <path d="M19.761 14.813l-2.84 -5.133c-.189 -.31 -.592 -.68 -1.421 -.68c-.828 0 -1.5 .448 -1.5 1v6"></path>
                                  <path d="M7.654 9.17l.729 -1.261c.16 -.249 1.056 -.203 1.117 .091l.177 1.38"></path>
                                  <path d="M4.239 14.813l2.84 -5.133c.189 -.31 .592 -.68 1.421 -.68c.828 0 1.5 .448 1.5 1v6"></path>
                                  <rect
                                    width="4"
                                    height="2"
                                    x="10"
                                    y="12"
                                  ></rect>
                                </svg>
                              </button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View this post</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <button
                              onClick={() =>
                                handleOpenChange({
                                  id: item._id,
                                  title: item.title,
                                })
                              }
                              className="bg-red-500 text-white px-2 py-1 rounded-md"
                            >
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
                                class="tabler-icon tabler-icon-trash-x w-5 h-5"
                              >
                                <path d="M4 7h16"></path>
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                <path d="M10 12l4 4m0 -4l-4 4"></path>
                              </svg>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete this post</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </>
          )}
        </TableBody>
      </Table>
      <DialogConfirm
        open={open}
        onOpenChange={handleOpenChange}
        dataPost={dataPost}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyPostPage;
