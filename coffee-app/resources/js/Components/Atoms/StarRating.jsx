import React from 'react';
import { HStack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const StarRating = ({ rating }) => {
  return (
    <>
      <HStack spacing={1}>
        {Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon key={i} color={i < rating ? 'yellow.500' : 'gray.300'} />
          ))}
      </HStack>
    </>
  );
};

export default StarRating;
