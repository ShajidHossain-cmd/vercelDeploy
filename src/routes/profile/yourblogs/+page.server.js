// @ts-nocheck
import clientPromise from "$lib/database/clientPromise";
import { ObjectId } from "mongodb";
export async function load({ parent }) {
  const { BlogList } = await parent();
  const { session } = await parent();
  let sessionEmail = session.user?.email;

  let matchingBlogs = [];

  if (sessionEmail) {
    for (const blog of BlogList) {
      const author = blog.author;

      if (author.email == sessionEmail) {
        matchingBlogs.push(blog);
      }
    }
  } else {
    console.log("Session user name not found.");
  }

  return {
    matchingBlogs,
  };
}
/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, params, session }) => {
    try {
      let client = await clientPromise;
      const dbName = "guides";
      const db = client.db(dbName);
      const collName = "blogs";
      const collection = db.collection(collName);
      const formData = await request.formData();
      const id = formData.get("DeleteID");
      const objectId = new ObjectId(id);

      // Attempt to find and delete the blog
      const result = await collection.deleteOne({ _id: objectId });

      if (result.deletedCount === 1) {
        // Blog successfully deleted
        console.log("Blog deleted");
      } else {
        throw new Error("Blog not found");
      }
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  },
};
