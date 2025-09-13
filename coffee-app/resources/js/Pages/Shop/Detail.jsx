import MainLayout from '@/Layouts/MainLayout';
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  Link,
  useToast,
} from '@chakra-ui/react';
import ReviewList from '@/Components/Organisms/ReviewList';
import { SmallAddIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
const Detail = (props) => {
  const toast = useToast();

  useEffect(() => {
    if (props.status === 'review-created') {
      toast({
        position: 'top',
        title: 'レビューを投稿しました。',
        description: 'レビューの投稿が完了しました。',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  });
  return (
    <>
      <Box p={4}>
        <Heading as="h2" size={'xl'} mb={4}>
          {props.shop.name}
        </Heading>
        {props.shop.shop_images ? (
          props.shop.shop_images.map((image) => (
            <Image
              key={image.id}
              boxSize="300px"
              objectFit="contain"
              src={import.meta.env.VITE_APP_URL + '/' + image.file_path}
              alt={image.file_name}
              mb={4}
            />
          ))
        ) : (
          <Image
            boxSize="300px"
            objectFit="contain"
            src="https://placehold.jp/100x100.png"
            alt={props.shop.name}
            mb={4}
          />
        )}
        <Text mb={2}>{props.shop.description}</Text>
        <Text mb={2}>{props.shop.location}</Text>

        {/* レビュー */}
        <Box mt={8}>
          <Heading as="h3" size={'lg'} mb={4}>
            レビュー
          </Heading>
          <Box>
            <Link href={`/review/create/shop/${props.shop.id}`}>
              <Button my={4}>
                <SmallAddIcon />
                レビューを書く
              </Button>
            </Link>
          </Box>
          <Box>
            {props.reviews > 0 && <Box mb={2}>({props.reviews.length})</Box>}
          </Box>
          <Box>
            {props.reviews.length === 0 && (
              <Text>レビューはまだありません</Text>
            )}
            <ReviewList reviews={props.reviews} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

Detail.layout = (page) => <MainLayout children={page} title="ショップ詳細" />;
export default Detail;
