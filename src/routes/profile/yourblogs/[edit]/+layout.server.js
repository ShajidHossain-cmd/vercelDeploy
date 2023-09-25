// @ts-nocheck
import { error } from "@sveltejs/kit";

export async function load({ parent, params }) {
  const id = params.edit;
  const { BlogList } = await parent();
  const { session } = await parent();
  const blog = BlogList.find((blog) => blog._id === id);

  if (!blog || !session) throw error(404);
  // comment

  return { blog, session };
}
