const ReviewSection = ({ reviews }) => {
    return (
      <div className="p-6 bg-white shadow-md rounded">
        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border-b p-2">
              <p className="font-semibold">{review.user}</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default ReviewSection;
  