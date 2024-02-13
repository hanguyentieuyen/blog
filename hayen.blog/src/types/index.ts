export type BlogForm = {
    title: string;
    category: string;
    content: string;
    image: string
}

export type Blog = BlogForm & {
    id: number;
    userId: string;
    userImage: string;
    comments: []
}

export type Option = {
    text: string;
    value: string
}[]