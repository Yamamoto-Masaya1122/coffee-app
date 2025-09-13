import React from 'react';
import StarRating from '../Atoms/StarRating';
import UserName from '../Atoms/UserName';
import { Box, Text, Link, Button } from '@chakra-ui/react';

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
        <Text style={{ whiteSpace: 'pre-wrap' }}>{review.comment}</Text>
        <UserName name={review.user.name} />
        <StarRating rating={review.rating} />
        <Box mt={3} w={'100%'} display={'flex'} justifyContent={'flex-end'}>
          <Link href={`/review/edit/${review.id}`}>
            <Button colorScheme={'blue'} fontSize={'14'}>
              編集
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default ReviewItem;
