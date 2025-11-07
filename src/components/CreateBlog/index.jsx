import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "../ui/button";
import BadgeBlog from "../BadgeBlog";
import CloudinaryUpload from "../CloudinaryUpload";

const CreateBlog = ({
  handleUpLoad,
  handleCreateBlog,
  handleCreateTag,
  handleDeleteTag,
  setBlogContent,
  setBlogTitle,
  tags,
  tagValue,
  setTagValue,
  loading,
}) => {
  const KEY_TINY = import.meta.env.VITE_TINY_KEY;

  return (
    <>
      <div className="grid gap-6">
        <div className="space-y-4">
          <CloudinaryUpload onUpLoad={handleUpLoad} />
        </div>
        <div className="grid gap-2">
          <Label className="font-medium leading-none text-sm">BLog Title</Label>
          <Input
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="Enter blog title"
          ></Input>
        </div>
        <div className="grid gap-2">
          <Label className="font-medium leading-none text-sm">
            Blog Content
          </Label>
          <Editor
            apiKey={KEY_TINY}
            init={{
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
              uploadcare_public_key: "79fb8495559d3c1a6e13",
            }}
            onEditorChange={(newContent) => setBlogContent(newContent)}
          />
        </div>
        <div className="grid gap-2">
          <Label className="font-medium leading-none text-sm">Blog Tag</Label>
          <div className="flex gap-2">
            <Input
              value={tagValue}
              onKeyDown={(e) => e.key === "Enter" && handleCreateTag()}
              onChange={(e) => setTagValue(e.target.value)}
              placeholder="Enter blog title"
            ></Input>
            <Button onClick={() => handleCreateTag()}>Add Tag</Button>
          </div>
          <div className="flex gap-2">
            {tags.length > 0
              ? tags.map((tag) => (
                  <BadgeBlog
                    tags={tag.name}
                    id={tag.id}
                    handleDeleteTag={handleDeleteTag}
                  />
                ))
              : ""}
          </div>
        </div>
        <div className="flex justify-center">
          <Button disabled={loading} onClick={() => handleCreateBlog()}>
            {loading === true ? "Creating Blog..." : "Create Blog"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
