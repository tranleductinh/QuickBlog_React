import CreateBlog from "@/components/CreateBlog";
import { createBlog } from "@/services/api/blog";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = () => {
  const [file, setFile] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateTag = () => {
    const newTag = {
      id: Date.now(),
      name: tagValue,
    };
    setTags([newTag, ...tags]);
    setTagValue("");
  };

  const handleDeleteTag = (id) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setTags(updatedTags);
  };

  const handleUpLoad = (file) => {
    setFile(file);
  };
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const handleCreateBlog = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await res.json();
      console.log("result", res.status);
      if (res.status == 200) {
        try {
          const newBlog = {
            title: blogTitle,
            image: result.url,
            content: blogContent,
            tags: tags.map((tag) => tag.name),
          };
          console.log("newBlog", newBlog)
          const response = await createBlog(newBlog);
          console.log("response", response);
          console.log("blog", newBlog);
        } catch (error) {
          console.log(error);
        }
      }
      toast.success("Tạo blog thành công");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-3xl sm:text-6xl font-semibold !sm:leading-[4rem] text-primary text-center mt-10 mb-8">
        📝 Create a New Blog
      </div>
      <CreateBlog
        handleUpLoad={handleUpLoad}
        handleCreateBlog={handleCreateBlog}
        handleCreateTag={handleCreateTag}
        handleDeleteTag={handleDeleteTag}
        setBlogContent={setBlogContent}
        setBlogTitle={setBlogTitle}
        tags={tags}
        tagValue={tagValue}
        setTagValue={setTagValue}
        loading={loading}
      />
    </div>
  );
};

export default CreateBlogPage;
