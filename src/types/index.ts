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
    params: Promise<{ id: string }>
}