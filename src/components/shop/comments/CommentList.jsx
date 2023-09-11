import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        const commentsCollection = collection(db, "shops", postId, "comments");
        const commentsQuery = query(
          commentsCollection,
          orderBy("timestamp", "asc")
        );
        const querySnapshot = await getDocs(commentsQuery);
        const commentData = querySnapshot.docs.map((doc) => doc.data());

        setComments(commentData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    const commentsCollection = collection(db, "shops", postId, "comments");
    const unsubscribe = onSnapshot(commentsCollection, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => doc.data());
      setComments(newComments);
    });

    return () => unsubscribe();
  }, [postId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Customer Comments:</h2>

      {loading ? (
        <p className="text-xl text-gray-500">Loading...</p>
      ) : comments.length === 0 ? (
        <p className="text-xl text-gray-500">No comments found.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.email}</span>
                <span className="text-gray-500 text-sm">
                  {comment.timestamp.toDate().toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
