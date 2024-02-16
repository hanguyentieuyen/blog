import BlogDetail from "@/components/blogs/blogDetails";

const blogById = async (blogId: number) => {
  const res = await fetch(
    `${process.env.LOCAL_URL}/api/blog/blogDetail?blogId=${blogId}`,
    {
      method: "GET",
      cache: "no-store",
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
