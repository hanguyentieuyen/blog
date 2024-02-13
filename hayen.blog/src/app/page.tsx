import BlogDetail from "@/components/blogs/blogDetails";
import BlogList from "@/components/blogs/blogList";
import Image from "next/image";

export default function Home() {
  return (
      <>
      <BlogList />
      <BlogDetail />
      </>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    // </main>
  );
}
