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
  Text
} from '@chakra-ui/react'
import { MdOutlineTimer } from 'react-icons/md';

const TimeInput = ({label, defaultValue}) => {
  return (
    <Box

    >
    <Heading size="md">{label}</Heading>
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
        w="280px"
        margin="10px"
      >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          Enable timer
          <Switch />
        </PopoverHeader>
        <PopoverBody>
          <Flex>
            <TimeInput
              label="Work"
              defaultValue={25}
            />
            <TimeInput
              label="Rest"
              defaultValue={5}
            />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};


export default TimerPopover;