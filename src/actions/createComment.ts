"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { commentSchema } from "@/schemas";
import { CreateCommentState } from "@/types";
import { revalidatePath } from "next/cache";

export const createComment = async({ postId, parentId }: { postId: string, parentId?: string } ,prevState: CreateCommentState ,formdata: FormData ): Promise<CreateCommentState> => {
    const res = commentSchema.safeParse({
        content: formdata.get("content")
    });

    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors
        }
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                formError: ["You have to login first to reply the comment"]
            }
        }
    };

    try {
        await prisma.comment.create({
            data: {
                content: res.data.content,
                postId: postId,
                userId: session.user.id,
                parentId: parentId
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message]
                }
            }
        }else {
            return{
                errors: {
                    formError: ["Failed to reply comment"]
                }
            }
        }
    }
    const topic = await prisma.topic.findFirst({
        where: {
            posts: {
                some: {
                    id: postId
                }
            }
        }
    });

    if (!topic) {
        return {
            errors: {
                formError: ["Failed to revalidate path"]
            }
        }
    }

    revalidatePath(`/topic/${topic?.slug}/posts/${postId}`)
    return {
        errors: {}
    }   
}
