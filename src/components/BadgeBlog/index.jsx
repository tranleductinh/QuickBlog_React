import { Badge } from "@/components/ui/badge";

export function BadgeBlog({ tags, id, handleDeleteTag }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge className="inline-flex">
          {tags}
          <span>
            <svg
              onClick={() => handleDeleteTag(id)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="tabler-icon tabler-icon-x cursor-pointer w-3 h-3"
            >
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </span>
        </Badge>
      </div>
    </div>
  );
}

export default BadgeBlog;
