import { IconButton, Flex, Stack, Spacer, Switch } from '@chakra-ui/react';
import { MdOutlineMenu } from 'react-icons/md';
import { TimerPopover } from './TimerPopover.js';
import { MainMenu } from './MainMenu.js'

export const NavBar = () => {
  return (<>
    <Flex
      as="header"
      position="relative"
      top="0"
      w="inherit"
      h="42px"
      backgroundColor="whitesmoke"
      justifyContent="space-between"
      borderRadius="15px 15px 0 0"
      className="BTTDraggable"
    > 
      <Stack
        direction="row"
        display="flex"
        alignItems="center"
        paddingLeft="11px"
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