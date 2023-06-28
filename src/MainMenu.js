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
  MdOutlineVolumeUp,
  MdOutlineVolumeOff,
  MdOutlineExitToApp
} from 'react-icons/md';
import { SettingsModal } from './SettingsModal.js'
import { useEffect, useState } from 'react';
import { getBTTVariable, setBTTVariable } from './apiService.js';

export const MainMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [muted, setMuted] = useState(false);
  
  useEffect(() => {
    getBTTVariable('appIsMuted')
      .then(isMuted => setMuted(isMuted));
  }, [])

  const handleMute = () => {
    setBTTVariable('appIsMuted', !muted);
    setMuted(!muted);
  };
  
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
      <MenuItem icon={muted
        ? <MdOutlineVolumeUp/>
        : <MdOutlineVolumeOff/>
      }
        onClick={handleMute}
      >
        {muted
          ? "Unmute all sounds"
          : "Mute all sounds"
        }
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
      <MenuDivider />
      <MenuItem icon={<MdOutlineExitToApp/>}
        onClick={() => onOpen()}
      >
        Exit
      </MenuItem>
    </MenuList>
    </Menu>
    <SettingsModal isOpen={isOpen} onClose={onClose} />
  </>);
};

export default MainMenu;