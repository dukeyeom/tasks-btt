import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import {
  MdOutlineMenu,
  MdOutlineRefresh,
  MdOutlineDarkMode,
  MdOutlineSettings
} from 'react-icons/md';

export const MainMenu = () => {
  return <Menu>
    <MenuButton 
      as={IconButton}
      color="blackAlpha.600"
      aria-label="Menu"
      fontSize="30px"
      icon={<MdOutlineMenu />}
      variant="ghost"
      size="sm"
    />
    <MenuList>
      <MenuItem icon={<MdOutlineRefresh/>}>
        Refresh
      </MenuItem>
      <MenuItem icon={<MdOutlineDarkMode/>}>
        Dark mode
      </MenuItem>
      <MenuItem icon={<MdOutlineSettings/>}>
        Settings
      </MenuItem>
    </MenuList>
  </Menu>
};

export default MainMenu;