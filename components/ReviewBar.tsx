import React from "react";

interface RatingBarProps {
  rating: number;
  count: number;
  total: number;
}

const mockReviews = {
  totalRating: 4.8,
  reviewsCount: 43,
  ratings: {
    5: 28,
    4: 9,
    3: 4,
    2: 1,
    1: 1,
  },
};

const RatingBar: React.FC<RatingBarProps> = ({ rating, count, total }) => {
  const percentage = (count / total) * 100;

  return (
    <div className="flex items-center space-x-2">
      <span className="w-4">{rating}</span>
      <div className="w-full bg-gray-200 h-2 rounded-lg overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-yellow-400 h-full"
        ></div>
      </div>
      <span className="w-6 text-right">{count}</span>
    </div>
  );
};

const ReviewsSummary: React.FC = () => {
  const { totalRating, reviewsCount, ratings } = mockReviews;

  return (
    <div className="w-full max-w-xs p-4 bg-white shadow-md rounded-md">
      <div className="flex items-center mb-4">
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className={`w-5 h-5 ${
                index < Math.floor(totalRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-lg font-bold">{totalRating}</span>
      </div>

      <div className="space-y-2">
        {Object.entries(ratings)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([rating, count]) => (
            <RatingBar
              key={rating}
              rating={Number(rating)}
              count={count}
              total={reviewsCount}
            />
          ))}
      </div>
    </div>
  );
};

export default ReviewsSummary;
