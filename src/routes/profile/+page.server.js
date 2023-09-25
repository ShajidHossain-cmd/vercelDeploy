// @ts-nocheck
import clientPromise from "$lib/database/clientPromise";
/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    let client = await clientPromise;
    const dbName = "development";
    const db = client.db(dbName);
    const collName = "users";
    const collection = db.collection(collName);

    const formData = await request.formData();
    const userEmail = formData.get("userEmail");
    const EditUserNameContent = formData.get("EditUserNameContent");

    const user = await collection.findOne({ email: userEmail });
    if (!user) {
      throw new Error("Blog not found");
    }

    if (EditUserNameContent !== null) {
      try {
        const result = await collection.updateOne(
          { email: userEmail },
          { $set: { name: EditUserNameContent } }
        );

        if (result.modifiedCount === 1) {
          console.log("name edited successfully.");
        } else {
          console.log("name not found or not edited.");
        }
      } catch (error) {
        console.error("Error editing name:", error);
      }
    }
  },
};
