"use client";
import React, { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/createComment";
import { CommentCreateFormProps } from "@/types";
import { Loader2 } from "lucide-react";

const CommentCreateForm: React.FC<CommentCreateFormProps> = ({ 
    postId, 
    parentId, 
    startOpen 
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [formState, action, isPending] = useActionState(createComment.bind(null, { postId, parentId }), { errors: {} });
  return (
    <div className="p-1">
      <Button
        size={"sm"}
        variant={"link"}
        onClick={() => setOpen((prev) => !prev)}
      >
        Reply
      </Button>
      {open && (
        <form className="space-y-2" action={action}>
          <Textarea
            placeholder="write a comment..."
            className="bg-gray-100 focus-visible:ring-0"
            name="content"
          />
          {
            formState.errors.content && (
                <p className="text-red-600 text-sm">{formState.errors.content}</p>
            )
          }
          {
            formState.errors.formError && (
              <div className="mt-2 rounded-lg border border-red-500 bg-red-100 p-3 text-red-700 text-sm font-medium">
                {formState.errors.formError}
              </div>
            )
          }
          <Button disabled={isPending} variant={"secondary"} size={"sm"}>
            {
                isPending ? (
                    <>
                        <Loader2 className="animate-spin mr-2"/>
                        Please wait
                    </>
                ) : (
                    "Save"
                )
            }
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentCreateForm;
