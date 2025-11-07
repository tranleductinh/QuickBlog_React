import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser, getUser, setRole } from "@/services/api/user";
import { Badge } from "@/components/ui/badge";
import DialogConfirm from "@/components/DialogConfirm";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import DropRole from "@/components/DropRole";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
const ManagementPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [open, setOpenChange] = useState(false);
  const [dialogDelete, setDialogDelete] = useState({});
  const [openRole, setOpenRole] = useState(false);
  const [id, setId] = useState("");
  const [editRole, setEditRole] = useState("");
  console.log("role edit", editRole);
  const handleOpenChange = ({ id, title }) => {
    setOpenChange(!open);
    setDialogDelete({ id, title });
  };
  const handleDelete = async (id) => {
    try {
      setOpenChange(false);
      await deleteUser(id);
      setUser(user.filter((item) => item._id !== id));
      toast.success("Xóa thành công");
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenRole = (id) => {
    setOpenRole(!openRole);
    setId(id);
  };
  const handleRole = async () => {
    try {
      await setRole(id, editRole);
      toast.success("Set role thành công");
      setOpenRole(false);
      setUser(user.map((item) => (item._id === id ? { ...item, role: editRole } : item)));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await getUser();
        console.log("response", response.data.items);
        setUser(response.data.items);
        console.log("object, re", response.data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      <div className="text-3xl sm:text-5xl font-semibold sm:leading-[4rem] text-primary text-center mt-10 mb-8">
        🧩 User Management
      </div>
      <Table className="w-[1240px] mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="">USERNAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>ROLE</TableHead>
            <TableHead className="text-left">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading === true ? (
            <TableCell className="align-middle text-center" colSpan={4}>
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
          ) : (
            <>
              {user.length === 0 ? (
                <TableCell className="align-middle text-center" colSpan={4}>
                  <div className="mx-auto w-5 min-h-[50vh] flex items-center justify-center">
                    You have no user
                  </div>
                </TableCell>
              ) : (
                user.map((item) => (
                  <TableRow>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <Badge className="border border-border text-foreground bg-background">
                        {item.role.charAt().toUpperCase() + item.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleOpenChange({
                              id: item._id,
                              title: item.username,
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
                        <button
                          onClick={() => handleOpenRole(item._id)}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-md"
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
                            className="tabler-icon tabler-icon-key w-5 h-5 text-primary"
                          >
                            <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z"></path>
                            <path d="M15 9h.01"></path>
                          </svg>
                        </button>
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
        dialogDelete={dialogDelete}
        handleDelete={handleDelete}
      />
      <Dialog open={openRole} onOpenChange={handleOpenRole}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <h2 className="!text-xl !font-semibold !leading-0">
              Change user role
            </h2>
            <p className="text-muted-foreground text-sm">
              Select the new role for this user. This action will take effect
              immediately.
            </p>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label className="font-medium leading-none text-sm">
                Select Role
              </Label>
              <DropRole setEditRole={setEditRole} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-background !text-foreground hover:text-accent-foreground hover:bg-accent border">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => handleRole()}>Save Change</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagementPage;
