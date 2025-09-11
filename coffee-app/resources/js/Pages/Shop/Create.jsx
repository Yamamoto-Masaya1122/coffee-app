import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Box } from '@chakra-ui/react';

const Create = () => {
  return <Box>新規作成</Box>;
};

Create.layout = (page) => <MainLayout children={page} title="店舗新規作成" />;
export default Create;
