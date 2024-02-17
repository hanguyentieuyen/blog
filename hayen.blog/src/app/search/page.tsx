"use client";

import BlogCard from "@/components/blogs/blogCard";
import Button from "@/components/button";
import { GlobalContext } from "@/context";
import { Blog } from "@/types";
import { Fragment, useContext, useEffect } from "react";

export default function Search() {
  const { searchQuery, setSearchQuery, searchResult, setSearchResult } =
    useContext(GlobalContext);
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/blog/delete?id=${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const data = await res.json();
    if (data.status) {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const res = await fetch(`/api/search?query=${searchQuery}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();
    if (data.status) {
      setSearchResult(data.data);
    }
  };

  useEffect(() => {
    setSearchResult([]), setSearchQuery("");
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <div className="w-full">
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search blog..."
                required
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>
        </div>
        <div className="mt-2">
          <Button text="Tìm kiếm" onClick={handleSearch} />
        </div>
      </div>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {searchResult && searchResult.length ? (
            searchResult.map((item: Blog) => (
              <Fragment key={item.id}>
                <BlogCard post={item} handleDelete={handleDelete} />
              </Fragment>
            ))
          ) : (
            <p className="text-xl dark:text-gray-100">Không có bài viết nào</p>
          )}
        </div>
      </div>
    </section>
  );
}
