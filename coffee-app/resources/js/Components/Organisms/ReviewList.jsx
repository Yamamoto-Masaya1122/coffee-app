import React from 'react';
import ReviewItem from '../Molecules/ReviewItem';
import { Box } from '@chakra-ui/react';

const ReviewList = ({ reviews }) => {
  return (
    <>
      <Box>
        {reviews.map((review, index) => (
          <ReviewItem review={review} key={index} />
        ))}
      </Box>
    </>
  );
};

export default ReviewList;
