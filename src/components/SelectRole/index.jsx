import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

export function SelectRole({ setEditRole }) {
  const [role, setRole] = React.useState("user");
  console.log("roleedit",role)
  React.useEffect(() => {
    setEditRole(role);
  }, [role, setRole]);
  return (
    <Select defaultValue={role} onValueChange={setRole}>
      <SelectTrigger className="w-[350px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup >
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="user" >
            <div className="pointer-events-none">
              <div className="flex items-center gap-2">
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
                  class="lucide lucide-user-round h-4 w-4 text-gray-600"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M20 21a8 8 0 0 0-16 0"></path>
                </svg>
                <span className="text-foreground font-normal">User</span>
              </div>
            </div>
          </SelectItem>
          <SelectItem value="admin">
            <span className="pointer-events-none">
              <div className="flex items-center gap-2">
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
                  class="lucide lucide-shield-check h-4 w-4 text-yellow-600"
                  aria-hidden="true"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span className="text-foreground font-normal">Admin</span>
              </div>
            </span>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectRole;
