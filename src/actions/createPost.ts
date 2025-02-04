"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { createPostSchema } from "@/schemas";
import { CreatePostFormState } from "@/types";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (formdata: FormData, prevState: CreatePostFormState, slug: string ,): Promise<CreatePostFormState> => {

    const res = createPostSchema.safeParse({ 
        title: formdata.get('title'), 
        content: formdata.get('content')
     });;

    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors
        }
    }

    const session = await auth();

    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                formError: ["You must be logged in to create a post"]
            }
        }
        
    }
    const topic = await prisma.topic.findFirst({
        where: {
            slug
        }
    });

    if (!topic) {
        return {
            errors: {
                formError: ["Topic does not exist"]
            }
        }
    }
    let post: Post;
    try {
        post = await prisma.post.create({
            data: {
                title: res.data.title,
                content: res.data.content,
                userId: session.user.id,
                topicId: topic?.id
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message]
                }
            }
        }else {
            return {
                errors: {
                    formError: ["An unknown error occured"]
                }
            }
        }
        
    };
    revalidatePath(`/topic/${slug}`);
    redirect(`/topic/${slug}/posts/${post.id}`);
}