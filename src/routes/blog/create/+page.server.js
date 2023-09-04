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

      // Create a new Date object to get the current date
      const currentDate = new Date();

      // Extract year, month, and day
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
      const day = currentDate.getDate();

      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
        day < 10 ? "0" : ""
      }${day}`;

      // Create the userPost object with additional properties
      const userPost = {
        title: formData.get("title"),
        date: formattedDate,
        author: formData.get("session"),
        content: formData.get("content"),
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
