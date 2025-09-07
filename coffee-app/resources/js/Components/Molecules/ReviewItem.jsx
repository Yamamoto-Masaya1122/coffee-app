import React from 'react';
import StarRating from '../Atoms/StarRating';
import UserName from '../Atoms/UserName';
import { Box, Text } from '@chakra-ui/react';

const ReviewItem = ({ review }) => {
  return (
    <>
      <Box
        key={review.id}
        p={4}
        borderWidth={'1px'}
        borderRadius={'lg'}
        overflow={'hidden'}
        boxShadow={'lg'}
        mb={4}
      >
        <Text>{review.comment}</Text>
        <UserName name={review.user.name} />
        <StarRating rating={review.rating} />
      </Box>
    </>
  );
};

export default ReviewItem;
