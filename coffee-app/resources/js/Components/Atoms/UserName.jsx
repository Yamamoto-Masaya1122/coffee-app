import React from 'react';
import { Text } from '@chakra-ui/react';

const UserName = ({ name }) => {
  return (
    <>
      <Text textAlign={'right'} fontSize={'sm'}>
        {name}
      </Text>
    </>
  );
};

export default UserName;
