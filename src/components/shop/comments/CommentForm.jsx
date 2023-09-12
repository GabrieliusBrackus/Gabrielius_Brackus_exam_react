import React from "react";
import { useFormik } from "formik";
import { useAuth } from "../../../store/AuthProvider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import * as Yup from "yup";

export default function CommentForm({ postId, onAddComment }) {
  const { user } = useAuth();

  const validationSchema = Yup.object().shape({
    text: Yup.string()
      .min(6, "Description must be at least 6 characters")
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema,
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
        console.error("Klaida pridedant komentarą: ", error);
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
            placeholder="Your comment"
            rows="3"
            className="w-full border rounded-md p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.text}
          />
          {formik.touched.text && formik.errors.text && (
            <div className="text-red-500">{formik.errors.text}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
