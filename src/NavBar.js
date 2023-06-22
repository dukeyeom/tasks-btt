import { IconButton, Flex, Stack, Spacer } from '@chakra-ui/react';
import { MdOutlineMenu } from 'react-icons/md';
import { TimerPopover } from './TimerPopover.js';
import { MainMenu } from './MainMenu.js'

export const NavBar = () => {
  return (<>
    <Flex
      as="header"
      position="fixed"
      top="0"
      w="100%"
      h="42px"
      backgroundColor="blackAlpha.50"
      justifyContent="space-between"
      borderRadius="15px 15px 0 0"
    > 
      <Stack
        direction="row"
      >
      </Stack>
      <Stack
        direction="row"
        display="flex"
        alignItems="center"
      >
        <TimerPopover />
        <MainMenu />
        <Spacer w="2px" />
      </Stack>
    </Flex>
  </>);
};

export default NavBar;