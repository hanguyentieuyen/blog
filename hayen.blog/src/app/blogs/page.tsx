import BlogList from "@/components/blogs/blogList";

const getAllBlogs = async () => {
  const res = await fetch(`${process.env.LOCAL_URL}/api/blog/getAll`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.status) return data.data;
};

export default async function BlogsPage() {
  const data = await getAllBlogs();
  return <BlogList list={data} />;
}
