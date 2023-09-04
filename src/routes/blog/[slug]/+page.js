// @ts-nocheck
import { error } from "@sveltejs/kit";
export async function load({ parent, params }) {
  const id = params.slug;
  const { BlogList } = await parent();
  const blog = BlogList.find((blog) => blog._id === id);
  if (!blog) throw error(404);

  return { blog };
}
