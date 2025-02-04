import { z } from "zod";

export const createTopicSchame = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, { message: "Must be lowercase without spaces" }),
    description: z.string().min(10, "Description must be at least 10 characters long"),
});

export const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
})