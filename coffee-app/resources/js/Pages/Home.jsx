import {
  Box,
  Heading,
  VStack,
  HStack,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import ReviewList from '@/Components/Organisms/ReviewList';

const Home = (props) => {
  return (
    <>
      <Box p={4}>
        <Heading fontSize={{ base: '24px', md: '40px', lg: '56px' }} mb={2}>
          ショップ一覧
        </Heading>
        <VStack spacing={4} align="stretch">
          {props.shops.map((shop) => (
            <Link
              href={`/shop/${shop.id}`}
              key={shop.id}
              _hover={{ color: 'gray.500' }}
            >
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
            </Link>
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
          <ReviewList reviews={props.newReviews} />
        </VStack>
      </Box>
    </>
  );
};

Home.layout = (page) => <MainLayout children={page} title="ショップ一覧" />;
export default Home;
