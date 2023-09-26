// @ts-nocheck
import clientPromise from "$lib/database/clientPromise";
import { ObjectId } from "mongodb";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, params }) => {
    const id = params.edit;
    const objectId = new ObjectId(id);
    let client = await clientPromise;
    const dbName = "guides";
    const db = client.db(dbName);
    const collName = "blogs";
    const collection = db.collection(collName);

    const formData = await request.formData();
    const blog = await collection.findOne({ _id: objectId });
    if (!blog) {
      throw new Error("Blog not found");
    }
    function getCurrentFormattedDate() {
      const months = [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dec.",
      ];

      const currentDate = new Date();
      const month = months[currentDate.getMonth()];
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();

      const formattedDate = `${month} ${day}, ${year}`;

      return formattedDate;
    }

    // Format the date as YYYY-MM-DD
    const formattedDate = getCurrentFormattedDate();

    const editedPost = {
      title: formData.get("title"),
      description: formData.get("description"),
      date: formattedDate,
      image: formData.get("ImageLink"),

      author: {
        name: formData.get("authorName"),
        title: null,
        email: formData.get("authorEmail"),
        profilePicture: formData.get("authorImage"),

        href: null,
      },
      content: formData.get("blogContent"),
      comments: [],
    };

    await collection.replaceOne({ _id: objectId }, editedPost);
  },
};
