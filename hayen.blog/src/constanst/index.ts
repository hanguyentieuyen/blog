import { BlogForm, Option } from "@/types";

export const categories: Option = [
    {
        text: "NextJS",
        value: "nextjs"
    },
    {
        text: "ReactJS",
        value: "reactjs"
    },
    {
        text: "Javascript",
        value: "javascript"
    },
    {
        text: "HTML",
        value: "html"
    },
    {
        text: "CSS",
        value: "css"
    }
]

export const initialBlogFrom: BlogForm = {
    title :  '',
    content : '',
    image : '',
    category : '' 
}