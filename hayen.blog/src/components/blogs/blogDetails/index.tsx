"use client";
import Button from "@/components/button";
import { Blog } from "@/types";
import Link from "next/link";
import { Fragment, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BlogDetail({ blogData }: { blogData: Blog }) {
  const session = useSession();
  const router = useRouter();
  const [comment, setComment] = useState<string>("");

  const handleCommentSave = async () => {
    let allComments = [...blogData.comments] as any;
    allComments.push(`${comment}|${session?.data?.user?.name}`);
    const res = await fetch(`/api/blog/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: blogData?.id,
        comments: allComments,
      }),
    });
    const data = await res.json();
    if (data && data.status) {
      setComment(""), router.refresh();
    }
  };
  if (!blogData) return null;
  return (
    <Fragment>
      <section className=" bg-white dark:bg-gray-900 antialiased">
        <div className="container">
          <div className="-mx-4 flex flex-col gap-4 items-center justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <h2 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                {blogData?.title}
              </h2>
              <div className="mb-5 flex flex-wrap items-center justify-between pb-4">
                <div className="flex flex-wrap items-center">
                  <div className="mr-10 mb-5 flex items-center">
                    <div className="mr-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image src={blogData?.userImage} alt="User" fill />
                      </div>
                    </div>
                    <div className="w-full">
                      <h4 className="mb-1 text-base font-medium text-body-color">
                        By
                        <span className="pl-2">
                          {blogData?.userId.split("_")[0]}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <Link
                    className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold text-gray-700 dark:text-gray-200"
                    href={`/category/${blogData?.category}`}
                  >
                    {blogData?.category}
                  </Link>
                </div>
              </div>
              <div>
                <div className="mb-10 w-full overflow-hidden rounded">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={blogData?.image || ""}
                      alt="Blog"
                      className="object-cover object-center"
                      fill
                    />
                  </div>
                </div>
                <p className="mb-8 leading-relaxed text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                  {blogData?.content}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-8/12 flex gap-4">
              {session !== null ? (
                <>
                  <input
                    name="comment"
                    id="comment"
                    autoFocus
                    autoComplete="on"
                    placeholder="Add comment here"
                    value={comment}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setComment(event.target.value)
                    }
                    className="w-full rounded-md border py-3 px-6"
                  />
                  <Button text="Add" onClick={handleCommentSave} />
                </>
              ) : null}
            </div>
            <section className="dark:bg-gray-900 py-8 lg:py-16 w-full lg:w-8/12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-black dark:text-white">
                  Comments: ({blogData?.comments.length})
                </h2>
              </div>
              {blogData && blogData.comments && blogData.comments.length > 0
                ? blogData.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="p-6 text-base rounded-lg dark:bg-gray-900"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-black dark:text-white font-semibold">
                            {comment.split("|")[1] === blogData?.userId
                              ? `${
                                  comment.split("|")[1].split("_")[0]
                                } (Author)`
                              : comment.split("|")[1].split("_")[0]}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400">
                        {comment.split("|")[0]}
                      </p>
                    </div>
                  ))
                : null}
            </section>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
