import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import CommentForm from "./comments/CommentForm";
import CommentList from "./comments/CommentList";

export default function SinglePost() {
  const { itemId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "shops", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [itemId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const isOnSale = post.saleOnSale;
  const price = post.price;
  const discountedPrice = isOnSale ? price * 0.5 : price;
  console.log(post);
  return (
    <div className="bg-gray-100 min-h-screen p-4 relative">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">{post.shopName}</h1>

        <div className="flex items-center text-gray-500 mb-4">
          <span className="mr-2">City: {post.town}</span>
          <span className="mr-2">Release year: {post.startYear}</span>
        </div>
        <p className="text-gray-700 text-lg mb-6">{post.description}</p>
        <img
          src={post.imageUrl}
          alt={post.shopName}
          className="mb-6 rounded-lg shadow-md mx-auto"
          style={{ maxHeight: "400px", maxWidth: "100%" }}
        />
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">
            {isOnSale ? (
              <div className="text-red-500">
                {" "}
                <del>{price.toFixed(2)}€</del> {discountedPrice.toFixed(2)}€{" "}
                <span className="bg-red-500 text-white font-bold py-1 px-2 rounded-full text-xs">
                  ON SALE!
                </span>
              </div>
            ) : (
              <div>{price.toFixed(2)}€</div>
            )}
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md z-10 mb-20">
        <CommentForm postId={itemId} onAddComment={handleAddComment} />
        <CommentList postId={itemId} comments={comments} />
      </div>
    </div>
  );
}
