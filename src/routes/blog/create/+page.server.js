import { redirect } from "@sveltejs/kit";
import clientPromise from "$lib/database/clientPromise";
export const load = async (event) => {
  const session = await event.locals.getSession();

  if (!session) {
    throw redirect(307, "/auth/signin");
  }

  return {
    session,
  };
};
/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    try {
      // Retrieve form data from the request
      const formData = await request.formData();

      // Get the author from the session (assuming you store the username in the session)

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

      // Create the userPost object with additional properties
      const userPost = {
        title: formData.get("title"),
        description: formData.get("description"),
        date: formattedDate,
        author: {
          name: formData.get("authorName"),
          email: formData.get("authorEmail"),
          title: null,

          profilePicture: formData.get("authorImage"),

          href: null,
        },
        content: formData.get("blogContent"),
        comments: [],
      };

      // Handle the data as needed
      console.log("User Post:", userPost);
      let client = await clientPromise;
      const dbName = "guides";
      const db = client.db(dbName);
      const collName = "blogs";
      const collection = db.collection(collName);
      await collection.insertOne(userPost);

      // Respond to the client
      // (You might send a response here)
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      // Respond with an error message
    }
  },
};
