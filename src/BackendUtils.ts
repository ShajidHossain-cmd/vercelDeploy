import type { Collection } from "mongodb";
export const returnBlogList = async (collection: Collection) => {
  const blogList = await collection.find().toArray();
  const SerializedBlogs = blogList.map((item) =>
    JSON.parse(
      JSON.stringify(item, (key, value) =>
        key == "_id" ? value.toString(value) : value
      )
    )
  );

  return SerializedBlogs;
};
