'use client'
import { Blog } from "@/types";
import BlogCard from "../blogCard";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BlogList({list}: {list: Blog[]}) {
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  },[])
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Nơi ghi chú và lưu trữ kiến thức về lập trình. 
          </h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {list && list.length ? list.map((item: Blog) => (<Fragment key={item.id}>
            <BlogCard post={item}/>
          </Fragment>)) : null}
        </div>
      </div>
    </section>
  );
}
