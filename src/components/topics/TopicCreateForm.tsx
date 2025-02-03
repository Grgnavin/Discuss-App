import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

const TopicCreateForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New topic</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Create a topic</DialogTitle>
          <DialogDescription className="text-center">
            Write a new topic to start discussion. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <Label htmlFor="name">
              Name
            </Label>
            <Input id="name" name="name"/>
          </div>
          <div>
            <Label htmlFor="description">
              Description
            </Label>
            <Textarea id="description" name="description"/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TopicCreateForm;
