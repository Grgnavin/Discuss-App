"use client";
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
import { createTopic } from "@/actions/createTopics";
import { useActionState } from "react";

const TopicCreateForm = () => {
  const [formstate, action] = useActionState(createTopic, { errors: {} });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New topic</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
        <DialogHeader>
          <DialogTitle className="text-center">Create a topic</DialogTitle>
          <DialogDescription className="text-center">
            Write a new topic to start discussion. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">
              Name
            </Label>
            <Input id="name" name="name"/>
          </div>
          {
            formstate.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {formstate.errors.name}
              </p>
            )
          }
          <div>
            <Label htmlFor="description">
              Description
            </Label>
            <Textarea id="description" name="description"/>
          </div>
          {
            formstate.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formstate.errors.description}
              </p>
            )
          }
          {
            formstate.errors.formError && (
              <div className="mt-2 rounded-lg border border-red-500 bg-red-100 p-3 text-red-700 text-sm font-medium">
                {formstate.errors.formError}
              </div>
            )
          }
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full mt-2">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TopicCreateForm;
