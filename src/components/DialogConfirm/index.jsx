import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogConfirm({
  open,
  onOpenChange,
  dataPost,
  handleDelete,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-lg p-6">
          <DialogHeader>
            <h2 className="!text-lg !leading-0 !font-semibold text-red-600">
              Confirm delete "{dataPost.title}"
            </h2>
            <p className="text-sm text-gray-500">
              This action cannot be undone. Are you sure you want to delete?
            </p>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-background rounded-xl !text-foreground hover:text-accent-foreground hover:bg-accent border">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => handleDelete(dataPost.id)}
              className="rounded-xl bg-red-600 hover:text-accent-foreground hover:bg-red-700 border"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default DialogConfirm;
