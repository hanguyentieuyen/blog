import BlogDetail from "@/components/blogs/blogDetails";

const blogById = async (blogId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blogDetail?blogId=${blogId}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  if (data.status) return data.data;
};
export default async function BlogDetailPage({
  params,
}: {
  params: { id: number };
}) {
  const blogData = await blogById(params.id);
  return <BlogDetail blogData={blogData} />;
}
