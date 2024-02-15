"use client";
import { Blog } from "@/types";
import Button from "../button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/constanst";

export default function Category({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();
  const lastedBlogId = Math.max(...blogs.map((blog) => blog.id));
  const lastedBlogsByCategory = blogs?.find((blog) => blog.id === lastedBlogId) ?? null
  const relatedBlogs = blogs?.filter((blog) => blog.id !== lastedBlogId) ?? []
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-8/12">
            {lastedBlogsByCategory === null ? (
              <div className="flex flex-col gap-4">
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                  No blog available for this category ! please create one
                </h2>
                <Button
                  text="Create New Blog"
                  onClick={() => router.push("/create")}
                />
              </div>
            ) : (
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                  {lastedBlogsByCategory?.title}
                </h2>
                <div className="mb-10 w-full overflow-hidden rounded">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={lastedBlogsByCategory?.image || ""}
                      alt="Blog"
                      fill
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <p className="mb-8 leading-relaxed text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                  {lastedBlogsByCategory?.content}
                </p>
              </div>
            )}
          </div>
          <div className="w-full px-4 lg:w-4/12">
            <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
              <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                Filter by Category
              </h3>
              <div className="flex flex-wrap py-6 px-8">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    onClick={() => router.push(`/category/${category.value}`)}
                    text={category.text}
                  />
                ))}
              </div>
            </div>
            <div className="mb-10 rounded-md bg-primary bg-opacity-5 dark:bg-opacity-10">
              <h3 className="border-b border-body-color border-opacity-10 py-4 px-8 text-lg font-semibold text-black dark:border-white dark:border-opacity-10 dark:text-white">
                Related Blogs
              </h3>
              <ul className="p-8">
                {relatedBlogs && relatedBlogs.length ? (
                  relatedBlogs.map((item) => (
                    <li
                      className="mb-6 border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10"
                      key={item.id}
                    >
                      <div className="flex items-center lg:block xl:flex">
                        <div className="mr-5 lg:mb-3 xl:mb-0">
                          <div className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
                            <Image src={item.image} alt="Blog" fill />
                          </div>
                        </div>
                        <div className="w-full">
                          <h5>
                            <Link
                              href={"/"}
                              className="mb-[8px] block text-base font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary"
                            >
                              {item.title}
                            </Link>
                          </h5>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <h1>No Related blogs available</h1>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
