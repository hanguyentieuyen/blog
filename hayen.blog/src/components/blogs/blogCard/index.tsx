import { Blog } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function BlogCard({
  post,
  handleDelete,
}: {
  post: Blog;
  handleDelete: (id: number) => {};
}) {
  const { content, title, category, userImage, userId, image, id } = post;
  const session = useSession();
  return (
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="relative block h-[250px] w-full">
        <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
          {category}
        </span>
        <Image src={image} alt="Blog Post" fill />
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <Link href={`/blogs/${id}`}>{title}</Link>
      </h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-100">
        {content}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            className="w-7 h-7 rounded-full"
            src={userImage}
            alt="avatar"
            width={30}
            height={30}
          />
          <span className="font-medium dark:text-white">
            {userId.split("_")[0]}
          </span>
          {session !== null && session.data?.user?.name === userId && (
            <FaTrash
              onClick={() => handleDelete(id)}
              className="dark:text-gray-100"
            />
          )}
        </div>
      </div>
    </article>
  );
}
