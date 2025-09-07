import { Box, Heading, VStack, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { StarIcon } from '@chakra-ui/icons';

const Home = (props) => {
  return (
    <>
      <Box m={4}>
        <Heading fontSize={{ base: '24px', md: '40px', lg: '56px' }} mb={2}>
          ショップ一覧
        </Heading>
        <VStack spacing={4} align="stretch">
          {props.shops.map((shop) => (
            <Box
              key={shop.id}
              p={4}
              borderWidth={'1px'}
              borderRadius={'lg'}
              overflow={'hidden'}
              boxShadow={'lg'}
            >
              <HStack spacing={4}>
                <Image
                  boxSize="100px"
                  objectFit="cover"
                  src="https://placehold.jp/100x100.png"
                  alt={shop.name}
                />
                <VStack align={'start'}>
                  <Heading as="h3" size="md">
                    {shop.name}
                  </Heading>
                  <Text>{shop.description}</Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
        <Heading
          as="h2"
          fontSize={{ base: '24px', md: '40px', lg: '56px' }}
          mt={8}
          mb={2}
        >
          新着レビュー
        </Heading>
        <VStack spacing={4} align={'stretch'}>
          {props.newReviews.map((review) => (
            <Box
              key={review.id}
              p={4}
              borderWidth={'1px'}
              borderRadius={'lg'}
              overflow={'hidden'}
              boxShadow={'lg'}
            >
              <VStack align={'start'}>
                <Text fontWeight={'bold'}>{review.user.name}</Text>
                <Text>{review.comment}</Text>
                <HStack spacing={1}>
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < review.rating ? 'yellow.500' : 'gray.300'}
                      />
                    ))}
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default Home;
