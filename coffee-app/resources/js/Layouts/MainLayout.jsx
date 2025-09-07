import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  IconButton,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';

const MainLayout = ({ children, title }) => {
  return (
    <>
      <header>
        <Box bg={'orange.600'}>
          {/* ヘッダー */}
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            py={{ base: 0, md: 3 }}
            px={{ base: 1, md: 2 }}
          >
            <Heading as="h1" size={{ base: 'xs', md: 'md' }} color={'white'}>
              <Link
                display={'flex'}
                alignItems={'center'}
                href="/home"
                _hover={{ color: 'gray.500' }}
              >
                <Image
                  boxSize="60px"
                  src="/images/Coffee.svg"
                  alt="CoffeeApp"
                />
                {import.meta.env.VITE_APP_NAME}
              </Link>
            </Heading>
            {/* PC表示 */}
            <HStack display={{ base: 'none', md: 'flex' }} color={'white'}>
              <Link href="#" _hover={{ color: 'gray.500' }}>
                マイページ
              </Link>
              <Link href="#" _hover={{ color: 'gray.500' }}>
                店舗登録
              </Link>
            </HStack>
            {/* SP表示 */}
            <Box
              display={{ base: 'block', md: 'none' }}
              px={{ base: '1', md: 'none' }}
              py={{ base: '2', md: 'none' }}
            >
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                  colorScheme="white"
                />
                <MenuList>
                  <MenuItem icon={<SettingsIcon />}>マイページ</MenuItem>
                  <MenuItem>店舗登録</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Box>
      </header>
      <Box>{children}</Box>
      {/* フッター */}
      <Box>
        <Box
          bg={'orange.600'}
          color={'white'}
          fontWeight={'bold'}
          textAlign={'center'}
          py={{ base: 2, md: 3 }}
        >
          <Text fontSize={{ base: 13, md: 16 }}>
            &copy; 2025 {import.meta.env.VITE_APP_NAME}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
