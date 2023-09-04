// import { MongoClient } from "mongodb";
// import { MONGODB_CONNECTION_STRING } from "$env/static/private";
// import { returnBlogList } from "../BackendUtils";
// export async function load({}) {
//   const client = new MongoClient(MONGODB_CONNECTION_STRING);

//   let dbError = {
//     hasError: false,
//     error: "",
//   };
//   let BlogList: string[] = [];
//   try {
//     await client.connect;
//   } catch (error: any) {
//     dbError.hasError = true;
//     dbError.error = error.message ?? "Error Connecting to  database";
//   }
//   const dbName = "guides";
//   const db = client.db(dbName);
//   const collName = "blogs";
//   const collection = db.collection(collName);
//   try {
//     BlogList = await returnBlogList(collection);
//   } catch (error: any) {
//     dbError.hasError = true;
//     dbError.error = error.message ?? "Error retrieving  blogs list";
//   }
//   return { dbError, BlogList };
// }

import { returnBlogList } from "../BackendUtils";
import clientPromise from "$lib/database/clientPromise"; // Import the clientPromise
export async function load({}) {
  let dbError = {
    hasError: false,
    error: "",
  };
  let BlogList: string[] = [];

  try {
    // Use the clientPromise to establish a connection to the database.
    const client = await clientPromise;
    const dbName = "guides";
    const db = client.db(dbName);
    const collName = "blogs";
    const collection = db.collection(collName);

    // Fetch the list of blogs using the returnBlogList function.
    try {
      BlogList = await returnBlogList(collection);
    } catch (error: any) {
      dbError.hasError = true;
      dbError.error = error.message ?? "Error retrieving blogs list";
    }
  } catch (error: any) {
    dbError.hasError = true;
    dbError.error = error.message ?? "Error Connecting to database";
  }

  return { dbError, BlogList };
}
