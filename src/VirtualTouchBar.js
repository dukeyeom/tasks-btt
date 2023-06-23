import { Center, Flex, Spacer, Text } from "@chakra-ui/react";
import {
  MdOutlineTimer,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked
} from "react-icons/md";

const VirtualTimerWidget = () => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="red"
      height="30px"
      borderRadius="5px"
      padding="7px"
      color="white"
      fontSize="16px"
      fontWeight="600"
      cursor="pointer"
    >
      <Center>
        <MdOutlineTimer
          fontSize="23px"
        />
      </Center>
      <Spacer
        width="5px"
      />
      <Text
        flexWrap="nowrap"
        minWidth="max"
        width="max"
      >
        25 min
      </Text>
    </Flex>
  );
};

const VirtualTaskWidget = () => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="#616161"
      height="30px"
      borderRadius="5px"
      padding="7px 14px 7px 7px"
      color="white"
      fontSize="15px"
      fontWeight="600"
      whiteSpace="nowrap"
    >
      <Center>
        <MdOutlineRadioButtonUnchecked
          fontSize="21px"
        />
      </Center>
      <Spacer
        width="7px"
      />
      <Text>
        Mark tasks as complete when task on Touch Bar is tapped and held
      </Text>
    </Flex>
  );
};

export const VirtualTouchBar = () => {
  return (
    <Flex
      justifyContent="left"
      alignItems="center"
      position="relative"
      width="full"
      height="40px"
      backgroundColor="black"
      borderRadius="7px"
      margin="5px"
      padding="15px 0 15px 15px"
      overflow="hidden"
    >
      <Flex
        className="innerVirtualTouchBar"
        gap="5px"
        width="max"
        overflow="scroll"
        paddingRight="10px"
      >
        <VirtualTimerWidget />
        <VirtualTaskWidget />
      </Flex>
    </Flex>
  );
};

export default VirtualTouchBar;