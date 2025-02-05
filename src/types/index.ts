import type { Post } from "@prisma/client";

export type CreateTopicFormSatate = {
    errors: {
        name?: string[];
        description?: string[];
        formError?: string[]
    },
}

export type TopicShowPageProps = {
    params: Promise<{ slug: string }>
}

export type CreatePostFormState = {
    errors: {
        title?: string[];
        content?: string[];
        formError?: string[] 
    }
}

export type CreatePostFormProps = {
    slug: string 
}

export type PostWithData = Post & {
    user: {
        name: string | null;
    },
    topic: {
        slug: string
    },
    _count: {
        comments: number
    }
}

export type PostListProps = {
    fetchData: () => Promise<PostWithData[]>
}

export type PostShowPageProps = {
    params: Promise<{ slug: string, postid: string }>
}

export type PostShowProps = {
    postId: string,
}