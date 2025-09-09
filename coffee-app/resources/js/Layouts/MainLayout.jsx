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
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Button,
} from '@chakra-ui/react';
import { usePage, Link as InertiaLink } from '@inertiajs/react';
import React from 'react';
import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';

const MainLayout = ({ children, title }) => {
  const { auth } = usePage().props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={{ base: 'xs', md: 'md' }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>menu</DrawerHeader>
          <DrawerBody>
            <VStack>
              <Link href="#" _hover={{ color: 'gray.500' }}>
                マイページ
              </Link>
              <Link href="#" _hover={{ color: 'gray.500' }}>
                店舗登録
              </Link>
              <InertiaLink
                href={route('logout')}
                _hover={{ color: 'gray.500' }}
                method="post"
                onClick={onClose}
              >
                ログアウト
              </InertiaLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
                href={route('shop.index')}
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
              {auth.user ? (
                <Box>
                  <Text
                    onClick={onOpen}
                    cursor={'pointer'}
                    ref={btnRef}
                    display={'flex'}
                    alignItems={'center'}
                  >
                    {auth.user.name}さん
                    <SettingsIcon mx={1} />
                  </Text>
                </Box>
              ) : (
                <>
                  <Box>
                    <Link href={route('login')}>
                      <Button
                        colorScheme={'white'}
                        variant={'outline'}
                        _hover={{ bg: 'gray.500' }}
                      >
                        ログイン
                      </Button>
                    </Link>
                  </Box>
                  <Box>
                    <Link href={route('register')}>
                      {' '}
                      <Button colorScheme={'blue'}>新規登録</Button>
                    </Link>
                  </Box>
                </>
              )}
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
