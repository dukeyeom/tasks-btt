import {
  Button,
  IconButton,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Box,
  Heading,
  Text,
  Spacer
} from '@chakra-ui/react'
import { MdOutlineTimer } from 'react-icons/md';

const TimeInput = ({label, defaultValue}) => {
  return (
    <Box
      position="relative"
      width="45%"
    >
    <Heading
      size="md"
      fontWeight="500"
      marginBottom="6px"
    >
      {label}
    </Heading>
    <NumberInput
      allowMouseWheel
      defaultValue={defaultValue}
      min={0}
      precision={0}
      size="lg"
    >
      <NumberInputField
        fontSize="3xl"
      />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
    </Box>
  );
};

export const TimerPopover = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          color="blackAlpha.600"
          aria-label="Timer"
          fontSize="30px"
          icon={<MdOutlineTimer />}
          variant="solid"
          size="sm"
        />
      </PopoverTrigger>
      <PopoverContent
        position="relative"
        left="-25px"
        w="280px"
      >
        <PopoverArrow />
        <PopoverHeader
          fontSize="xl"
          fontWeight="700"
          display="flex"
          alignItems="center"
        >
          Pomodoro Timer
          <Spacer />
          <Switch />
        </PopoverHeader>
        <PopoverBody
          padding="7px 5px 10px 5px"
        >
          <Flex
            justifyContent="space-around"
            paddingBottom="11px"
          >
            <TimeInput
              label="Work"
              defaultValue={25}
            />
            <TimeInput
              label="Rest"
              defaultValue={5}
            />
          </Flex>
          <hr />
          <Text
            padding="3px"
          >
            Completed 0 pomodoros today
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};


export default TimerPopover;