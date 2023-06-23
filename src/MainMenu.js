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
  useDisclosure
} from '@chakra-ui/react';
import {
  MdOutlineMenu,
  MdOutlineRefresh,
  MdOutlineDarkMode,
  MdOutlineSettings,
  MdOutlineVolumeOff
} from 'react-icons/md';
import { SettingsModal } from './SettingsModal.js'

export const MainMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (<>
    <Menu>
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
      <MenuItem icon={<MdOutlineRefresh/>}

      >
        Refresh
      </MenuItem>
      <MenuItem icon={<MdOutlineVolumeOff/>}
      
      >
        Mute all sounds
      </MenuItem>
      <MenuItem icon={<MdOutlineDarkMode/>}
      
      >
        Dark mode
      </MenuItem>
      <MenuItem icon={<MdOutlineSettings/>}
        onClick={() => onOpen()}
      >
        Settings
      </MenuItem>
    </MenuList>
    </Menu>
    <SettingsModal isOpen={isOpen} onClose={onClose} />
  </>);
};

export default MainMenu;