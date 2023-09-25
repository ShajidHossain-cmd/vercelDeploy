// @ts-nocheck
import clientPromise from "$lib/database/clientPromise";
import { ObjectId } from "mongodb";

export const load = async (event) => {
  const session = await event.locals.getSession();

  return {
    session,
  };
};

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, params }) => {
    try {
      const id = params.slug;

      const objectId = new ObjectId(id);
      const autoObjectId = new ObjectId();
      const autoObjectIdc = new ObjectId();
      const autoObjectIdr = new ObjectId();

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
      const sessionName = formData.get("sessionName");
      const sessionImage = formData.get("sessionImage");
      const currentDateFormatted = getCurrentFormattedDate();

      // Create the userPost object with additional properties
      const userComment = {
        _id: autoObjectId,
        commenter: {
          name: sessionName,
          profilePicture: sessionImage,
          email: formData.get("sessionEmail"),
        },
        date: currentDateFormatted,
        content: formData.get("content"),
        replies: [],
      };

      if (userComment.content !== null) {
        blog.comments.push(userComment);

        // Update the blog document with the modified comments array
        await collection.updateOne(
          { _id: objectId },
          { $set: { comments: blog.comments } }
        );
      }

      const CommentReply = {
        _id: autoObjectIdc,
        commenter: {
          name: sessionName,
          profilePicture: sessionImage,
          email: formData.get("sessionEmail"),
        },
        date: currentDateFormatted,
        content: formData.get("commentReply"),
      };

      const CommentID = formData.get("CommentID");

      const commentObjectId = new ObjectId(CommentID);
      // Find the comment in the blog's comments array by its _id

      const commentItem = blog.comments.find((comment) =>
        comment._id.equals(commentObjectId)
      );
      if (CommentReply.content !== null) {
        // Push CommentReply into the replies array of the found comment
        commentItem.replies.push(CommentReply);

        // Update the blog document with the modified comments array
        await collection.updateOne(
          { _id: objectId },
          { $set: { comments: blog.comments } }
        );
      }
      // reply sever point

      const ReplyID = formData.get("ReplyID");
      const ReplyObjectId = new ObjectId(ReplyID);

      const ReplyContent = formData.get("repliesReply");
      let ReplyItem = null;
      let replyCommentItem;
      if (ReplyContent !== null) {
        for (replyCommentItem of blog.comments) {
          const replies = replyCommentItem.replies;
          ReplyItem = replies.find((reply) => reply._id.equals(ReplyObjectId));
          if (ReplyItem) {
            // If the reply is found, break out of the loop
            break;
          }
        }
        const ReplyName = ReplyItem.commenter.name;
        // const ReplyContent = formData.get("repliesReply");

        const ReplyTO = {
          _id: autoObjectIdr,
          commenter: {
            name: sessionName,
            profilePicture: sessionImage,
            email: formData.get("sessionEmail"),
          },
          date: currentDateFormatted,
          content: `@${ReplyName} ${ReplyContent}`,
        };
        if (ReplyContent !== null) {
          // Now you can use ReplyTO as the new reply object
          replyCommentItem.replies.push(ReplyTO);

          await collection.updateOne(
            { _id: objectId },
            { $set: { comments: blog.comments } }
          );
        } else {
          console.log("Reply not found"); // Handle the case where the reply is not found
        }
      }

      // reply server point
      // ... button server point
      const CommentDeleteID = formData.get("CommentDeleteID");

      const CommentEditID = formData.get("CommentEditID");
      const CommentEditContent = formData.get("CommentEditContent");
      const replyEditContent = formData.get("replyEditContent");
      const replyEditID = formData.get("replyEditID");
      const replyDeleteID = formData.get("replyDeleteID");
      const CommentReplyDeleteID = formData.get("CommentReplyDeleteID");
      const CommentReplyEditID = formData.get("CommentReplyEditID");
      const deleteComment = new ObjectId(CommentDeleteID);
      const EditComment = new ObjectId(CommentEditID);
      const DeleteReplyCommentID = new ObjectId(CommentReplyDeleteID);
      const EditReplyCommentID = new ObjectId(CommentReplyEditID);
      const DeleteReply = new ObjectId(replyDeleteID);
      const EditReply = new ObjectId(replyEditID);

      if (CommentDeleteID !== null) {
        try {
          const result = await collection.updateOne(
            { _id: objectId },
            {
              $pull: {
                comments: { _id: deleteComment },
              },
            }
          );

          if (result.modifiedCount === 1) {
            console.log("Comment deleted successfully.");
          } else {
            console.log("Comment not found or not deleted.");
          }
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      }
      if (CommentEditID !== null) {
        try {
          const result = await collection.updateOne(
            { _id: objectId, "comments._id": EditComment },
            {
              $set: {
                "comments.$.content": CommentEditContent,
              },
            }
          );

          if (result.modifiedCount === 1) {
            console.log("Comment edited successfully.");
          } else {
            console.log("Comment not found or not edited.");
          }
        } catch (error) {
          console.error("Error editing comment:", error);
        }
      }

      if (replyDeleteID !== null) {
        try {
          const result = await collection.updateOne(
            { _id: objectId, "comments._id": DeleteReplyCommentID },
            {
              $pull: {
                "comments.$.replies": { _id: DeleteReply },
              },
            }
          );
          if (result.modifiedCount === 1) {
            console.log("Reply deleted successfully.");
          } else {
            console.log("Reply not found or not deleted.");
          }
        } catch (error) {
          console.error("Error deleting reply:", error);
        }
      }
      if (replyEditID !== null) {
        try {
          const result = await collection.updateOne(
            {
              _id: objectId,
              "comments._id": EditReplyCommentID,
              "comments.replies._id": EditReply,
            },
            {
              $set: {
                "comments.$[comment].replies.$[reply].content":
                  replyEditContent,
              },
            },
            {
              arrayFilters: [
                { "comment._id": EditReplyCommentID },
                { "reply._id": EditReply },
              ],
            }
          );

          if (result.modifiedCount === 1) {
            console.log("Reply edited successfully.");
          } else {
            console.log("Reply not found or not edited.");
          }
        } catch (error) {
          console.error("Error editing reply:", error);
        }
      }

      // ... button server point
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      // Respond with an error message
    }
  },
};
