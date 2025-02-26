"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { createTopicSchame } from "@/schemas";
import { CreateTopicFormSatate } from "@/types";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createTopic = async (prevState: CreateTopicFormSatate, formdata: FormData): Promise<CreateTopicFormSatate> => {

    const res = createTopicSchame.safeParse({ 
        name: formdata.get("name") as string, 
        description: formdata.get("description") as string
     });

    if (!res.success) {
        return {
            errors: res.error.flatten().fieldErrors
        }
    }
    const session = await auth();

    if (!session || !session.user) {
        return {
            errors: {
                formError: ["You must be logged in to create a topic"]
            }
        }
    }
    let topic: Topic;
    try {
        topic = await prisma.topic.create({
            data: {
                slug: res.data.name,
                description: res.data.description,
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message]
                }
            }
        }else {
            return {
                errors: {
                    formError: ["An error occurred"]
                }
            }
        }
    }
    revalidatePath("/");
    redirect(`/topic/${topic.slug}`);
}