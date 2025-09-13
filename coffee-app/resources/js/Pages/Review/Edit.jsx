import React, { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  HStack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import MainLayout from '@/Layouts/MainLayout';
import { router } from '@inertiajs/react';

const Edit = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [values, setValues] = useState({
    review_id: props.review.id,
    rating: props.review.rating,
    comment: props.review.comment,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    e.target.disabled = true;
    router.post(route('review.update'), values);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    router.delete(route('review.destroy', { id: values.review_id }));
  };

  const handleCheck = (e) => {
    e.preventDefault();
    onOpen();
  };
  return (
    <>
      <Box
        p={4}
        m={4}
        mx={'auto'}
        bg={'gray.100'}
        borderRadius={'md'}
        boxShadow={'md'}
        w={{ base: '90%', md: 700 }}
      >
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>最終確認</AlertDialogHeader>
              <AlertDialogBody>この内容で更新しますか？</AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  キャンセル
                </Button>
                <Button colorScheme={'blue'} ml={3} onClick={handleSubmit}>
                  {loading ? <Spinner /> : '更新する'}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Heading as="h2" size={'md'} mb={4} color={'blue.900'}>
          レビューを編集
        </Heading>
        <Text fontSize={'xl'} color={'gray.500'} mb={2}>
          {props.review.shop.name}
        </Text>
        <form onSubmit={handleCheck}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="rating" fontWeight={'bold'}>
              評価
            </FormLabel>
            <HStack spacing={1} mb={4}>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    color={
                      i < values.rating || i < hoverRating
                        ? 'yellow.500'
                        : 'gray.300'
                    }
                    cursor={'pointer'}
                    onClick={() => setValues({ ...values, rating: i + 1 })}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
            </HStack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="comment" fontWeight={'bold'}>
              コメント
            </FormLabel>
            <Textarea
              name="comment"
              id="comment"
              onChange={handleChange}
              value={values.comment}
            ></Textarea>
          </FormControl>
          <Button type="submit" colorScheme="green" mt={4} mr={1}>
            更新する
          </Button>
        </form>
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Button colorScheme="red" type="submit" m={4} onClick={handleDelete}>
          削除する
        </Button>
      </Box>
    </>
  );
};

Edit.layout = (page) => <MainLayout children={page} title="レビュー編集" />;
export default Edit;
