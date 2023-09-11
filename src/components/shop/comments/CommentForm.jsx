import React from "react";
import { useFormik } from "formik";
import { useAuth } from "../../../store/AuthProvider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export default function CommentForm({ postId, onAddComment }) {
  const { user } = useAuth();
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const userData = user ? { email: user.email } : {};
        const commentData = {
          ...userData,
          text: values.text,
          timestamp: new Date(),
        };

        const commentsCollection = collection(db, "shops", postId, "comments");
        await addDoc(commentsCollection, commentData);

        console.log("Gauti komentaro duomenys:", commentData);
        onAddComment(commentData);

        resetForm();
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    },
  });

  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="text-lg font-semibold mb-2">Leave a Comment</h3>
        <div className="mb-4">
          <textarea
            name="text"
            placeholder="Your Comment"
            rows="3"
            className="w-full border rounded-md p-2"
            onChange={formik.handleChange}
            value={formik.values.text}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}
