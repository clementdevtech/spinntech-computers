import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReview } from "../redux/reviewSlice";

const ReviewSection = () => {
  const [reviewText, setReviewText] = useState("");
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviews);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      dispatch(addReview({ text: reviewText }));
      setReviewText("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
      <div className="bg-white p-4 shadow-md rounded">
        <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>
        <form onSubmit={handleReviewSubmit} className="mb-4">
          <textarea 
            value={reviewText} 
            onChange={(e) => setReviewText(e.target.value)} 
            className="w-full p-2 border rounded" 
            placeholder="Write your review..."
            required
          ></textarea>
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>

        <h3 className="text-xl font-semibold mt-4">Recent Reviews:</h3>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="border-b py-2">{review.text}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
