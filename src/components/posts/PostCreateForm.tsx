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
import React, { useActionState } from "react";
import { createPost } from "@/actions/createPost";
import { CreatePostFormProps, CreatePostFormState } from "@/types";

const PostCreateForm: React.FC<CreatePostFormProps> = ({ slug }) => {
    const [formstate, action] = useActionState(
        async (prevState: CreatePostFormState, formData: FormData) => createPost(formData, prevState, slug),
        { errors: {} }
      );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
        <DialogHeader>
          <DialogTitle className="text-center">Create Post</DialogTitle>
          <DialogDescription className="text-center">
            Write a new post. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">
              Title
            </Label>
            <Input id="title" name="title"/>
          </div>
          {
            formstate.errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {formstate.errors.title}
              </p>
            )
          }
          <div>
            <Label htmlFor="content">
                Content
            </Label>
            <Textarea id="content" name="content"/>
          </div>
          {
            formstate.errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {formstate.errors.content}
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
          <Button type="submit" className="w-full mt-2">Submit</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PostCreateForm;
