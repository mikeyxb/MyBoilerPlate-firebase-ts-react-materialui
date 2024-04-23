import React from 'react';
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

interface ReviewsPageProps {
  reviews: {
    id: string;
    guest: string;
    review: string;
  }[];
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h2>{review.guest}</h2>
          <p>{review.review}</p>

          <Button variant="outlined" color='error' >Delete</Button>{''}

          <Button variant="contained" endIcon={<ModeEditIcon />}>Edit</Button>
        </div>
      ))}
    </div>
  );
};

export default ReviewsPage;