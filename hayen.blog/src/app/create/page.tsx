"use client";

import Button from "@/components/button";
import { categories, initialBlogFrom } from "@/constanst";
import { GlobalContext } from "@/context";
import { app } from "@/utils/google";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const handleUploadImage = (file: any) => {
  const nameFile = new Date().getTime() + file.name;
  const storage = getStorage(app);
  const storageRef = ref(storage, `blog/${nameFile}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      }
    );
  });
};

export default function Create() {
  const { formBlog, setFormBlog } = useContext(GlobalContext);
  const { data: session } = useSession();
  const router = useRouter();

  const handleOnChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const uploadImage = await handleUploadImage(e.target.files[0]);
    if (uploadImage !== "") {
      setFormBlog({
        ...formBlog,
        image: String(uploadImage),
      });
    }
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/blog/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formBlog,
        userId: session?.user?.name,
        userImage: session?.user?.image,
        comments: [],
      }),
    });

    const data = await res.json();
    if (data && data.status) {
      setFormBlog(initialBlogFrom);
      router.push("/blogs");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <form>
          <div className="text-gray-100 rounded-lg bg-gray-100 dark:bg-gray-800 p-8">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
              Create Post
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormBlog({
                        ...formBlog,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setFormBlog({
                        ...formBlog,
                        category: e.target.value,
                      });
                    }}
                  >
                    <option>Select</option>
                    {categories && categories.map((option, index) => (
                      <option
                        key={index}
                        id={option.value}
                        value={option.value}
                      >
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Cover photo
                </label>
                <input
                  name="cover-photo"
                  id="cover-photo"
                  accept="image/*"
                  max={1000000}
                  onChange={handleOnChangeImage}
                  type="file"
                  className="w-full rounded-md border border-transparent py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  Content
                </label>
                <div className="mt-2">
                  <textarea
                    id="content"
                    name="content"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setFormBlog({
                        ...formBlog,
                        content: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-4">
            <Button text="Cancel" onClick={() => setFormBlog(initialBlogFrom)} />
            <Button text="Publish" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </section>
  );
}
