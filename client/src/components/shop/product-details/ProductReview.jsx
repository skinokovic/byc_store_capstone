import { useState } from "react";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";

function StarRow({ rating, size = 14 }) {
  // const { user } = useSelector((state) => state.auth);
  const fullStars = Math.round(rating);
  return (
    <div className="d-flex align-items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          color="#e8722c"
          fill={i < fullStars ? "#e8722c" : "none"}
        />
      ))}
    </div>
  );
}

function computeBreakdown(reviews) {
  const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => Math.round(r.rating) === stars).length,
  }));
  return breakdown;
}

function RatingsSummary({ averageRating, breakdown }) {
  const maxCount = Math.max(1, ...breakdown.map((b) => b.count));

  return (
    <div className="row g-4 align-items-center">
      <div className="col-12 col-sm-4 text-center">
        <div className="bg-light rounded p-4">
          <h2 className="fw-bold mb-2">{averageRating.toFixed(1)}/5.0</h2>
          <div className="d-flex justify-content-center">
            <StarRow rating={averageRating} size={18} />
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-8">
        {breakdown.map((row) => (
          <div className="d-flex align-items-center gap-2 mb-2" key={row.stars}>
            <span className="small text-nowrap" style={{ width: 14 }}>
              {row.stars}
            </span>
            <Star size={12} color="#e8722c" fill="#e8722c" />
            <div className="progress flex-grow-1" style={{ height: 6 }}>
              <div
                className="progress-bar"
                style={{
                  width: `${(row.count / maxCount) * 100}%`,
                  backgroundColor: "#e8722c",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="py-3 border-bottom">
      <p className="fw-semibold mb-1">{review.comment}</p>
      <div className="d-flex align-items-center gap-2">
        <StarRow rating={review.rating} size={13} />
        <span className="small text-secondary">
          {new Date(review.createdAt).toLocaleDateString()} by {review.name}
        </span>
      </div>
    </div>
  );
}

function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit({ rating, comment });
    setComment("");
    setRating(5);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-3 bg-light rounded">
      <p className="small fw-semibold mb-2">Write a review</p>
      <div className="d-flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => setRating(n)}
            className="btn p-0 border-0 bg-transparent"
            aria-label={`${n} star`}
          >
            <Star
              size={20}
              color="#e8722c"
              fill={n <= rating ? "#e8722c" : "none"}
            />
          </button>
        ))}
      </div>
      <textarea
        className="form-control mb-2"
        rows={3}
        placeholder="Share your thoughts on this product..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" className="btn btn-danger btn-sm">
        Submit Review
      </button>
    </form>
  );
}

function ProductReviews({
  averageRating = 0,
  totalReviews = 0,
  reviews = [],
  onSubmitReview,
}) {
  const breakdown = computeBreakdown(reviews);
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="py-4">
      <h5 className="fw-bold mb-4">Customer Reviews</h5>

      <p className="text-uppercase text-secondary small fw-bold mb-3">
        Product Ratings ({totalReviews})
      </p>
      <RatingsSummary averageRating={averageRating} breakdown={breakdown} />

      <div className="d-flex justify-content-between align-items-center mt-5 mb-2">
        <p className="text-uppercase text-secondary small fw-bold mb-0">
          Product Reviews ({reviews.length})
        </p>
      </div>

      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard review={review} key={review._id} />
          ))
        ) : (
          <p className="text-secondary small">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>

      {onSubmitReview && user && <ReviewForm onSubmit={onSubmitReview} />}
    </section>
  );
}

export default ProductReviews;
