import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Text,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { useForm, router } from '@inertiajs/react';
import { CloseIcon } from '@chakra-ui/icons';

const Edit = (props) => {
  const existingImages = props.shop.shop_images
    ? props.shop.shop_images.map((image) => ({
        id: image.id,
        file_name: image.file_name,
        file_path: image.file_path,
      }))
    : [];
  const { data, setData, post, errors } = useForm({
    id: props.shop.id,
    name: props.shop.name,
    location: props.shop.location,
    description: props.shop.description,
    images: [],
    existingImages: existingImages, // 既存の画像情報を追加
  });

  const toast = useToast();
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + data.existingImages.length > 3) {
      toast({
        title: '画像は3つまでです。',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      e.target.value = ''; // 選択をリセット
      return;
    }
    setData('images', files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    router.post(route('shop.update'), data);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    router.post(route('shop.update'), data, { forceFormData: true });
  };

  const handleRemoveImage = (index, type) => {
    if (type === 'existing') {
      const images = [...data.existingImages];
      images.splice(index, 1);
      setData('existingImages', images);
    } else if (type === 'new') {
      const images = [...data.images];
      images.splice(index, 1);
      setData('images', images);
      // getElementByIdでinput要素を複数取得する
      const dataTransfer = new DataTransfer();
      const imageFiles = document.getElementById('images').files;

      Array.from(imageFiles).forEach((file, i) => {
        if (i !== index) {
          dataTransfer.items.add(file);
        }
      });
      document.getElementById('images').files = dataTransfer.files;
    }
  };

  return (
    <Box p={4} m={4} w={{ base: '90%', md: '700px' }}>
      <Heading as="h2" fontSize={{ base: 18, md: 24 }} md={6}>
        店舗の編集
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" mb={4} mt={4}>
          <FormLabel>店舗名</FormLabel>
          <Input
            isRequired
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
        </FormControl>
        <FormControl id="location" mb={4}>
          <FormLabel>場所</FormLabel>
          <Input
            isRequired
            id="location"
            type="text"
            name="location"
            value={data.location}
            onChange={(e) => setData('location', e.target.value)}
          />
        </FormControl>
        <FormControl id="description" mb={4}>
          <FormLabel>説明</FormLabel>
          <Textarea
            isRequired
            id="description"
            name="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
          />
        </FormControl>
        <FormControl id="images" mb={4}>
          <FormLabel fontWeight={'bold'}>画像</FormLabel>
          {/* プレビュー */}
          <Text mb={2}>プレビュー</Text>
          <Box display={'flex'} mb={2} bg={'gray.200'}>
            {data.existingImages.map((image, index) => (
              <Box key={image.id} px={2} position={'relative'}>
                <img
                  src={import.meta.env.VITE_APP_URL + '/' + image.file_path}
                  alt={image.file_name}
                  style={{ width: 100 }}
                />
                <IconButton
                  isRound={true}
                  position={'absolute'}
                  top={{ base: -4, md: -5 }}
                  right={0}
                  variant="solid"
                  aria-label="Done"
                  icon={<CloseIcon />}
                  fontSize={{ base: 'xs', md: 'sm' }}
                  colorScheme="gray"
                  onClick={() => handleRemoveImage(index, 'existing')}
                />
              </Box>
            ))}
            {/* プレビュー */}
            {data.images.length > 0 && (
              <Box display={'flex'} mb={2} bg={'gray.200'}>
                {data.images.map((image, index) => (
                  <Box key={image.name} px={2} position={'relative'}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      style={{ width: 100 }}
                    />
                    <IconButton
                      isRound={true}
                      position={'absolute'}
                      top={{ base: -4, md: -5 }}
                      right={0}
                      variant="solid"
                      aria-label="Done"
                      icon={<CloseIcon />}
                      fontSize={{ base: 'xs', md: 'sm' }}
                      colorScheme="gray"
                      onClick={() => handleRemoveImage(index, 'new')}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Input
            id="images"
            type="file"
            name="images"
            multiple
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          更新
        </Button>
      </form>
      <Box display={'flex'} justifyContent={'center'}>
        <Button colorScheme="red" type="submit" m={4} onClick={handleDelete}>
          削除する
        </Button>
      </Box>
    </Box>
  );
};

export default Edit;
Edit.layout = (page) => <MainLayout children={page} title="店舗編集" />;
