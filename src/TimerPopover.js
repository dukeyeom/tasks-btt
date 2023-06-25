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
import { useEffect, useState } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { getBTTVariable, changeTimerVariable as changeTimer, setBTTVariable} from './apiService';

const TimeInput = ({timer, label, defaultValue}) => {
  const interval = (label === 'Work') ? 'workLength' : 'restLength';
  const [min, setMin] = useState(timer[interval]);
  const handleChange = (num) => setMin(num);

  useEffect(() => {
    setBTTVariable('timer', {...timer, [interval]: min});
  }, [min])

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
      defaultValue={timer[interval]}
      min={0}
      precision={0}
      size="lg"
      value={min}
      onChange={handleChange}
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

const PomodoroCount = ({count, emoji}) => {
  const countString = Array.from({length: count}, () => emoji).join('');
  if (count === 0)
    return null;
  return <>
    <hr />
    <Box
      padding="5px"
    >
      <Text>
        Pomodoros completed today
      </Text>
      <Flex
        display="flex"
        justifyContent="space-around"
        fontSize="59px"
      >
        {countString}
      </Flex>
    </Box>
  </>
};

export const TimerPopover = ({timerObject}) => { 
  const [timer, setTimer] = useState(timerObject);
  useEffect(() => {
    setBTTVariable('timer', timer);
  }, [timer])

  const handleSwitchChange = () => {
    setTimer({...timer, enabled: !timer.enabled});
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          color="blackAlpha.600"
          aria-label="Timer"
          fontSize="30px"
          icon={<MdOutlineTimer />}
          variant="ghost"
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
          <Switch
            value="checked"
            isChecked={timer.enabled}
            onChange={handleSwitchChange}
          />
        </PopoverHeader>
        <PopoverBody
          padding="7px 5px 10px 5px"
        >
          <Flex
            justifyContent="space-around"
            paddingBottom="11px"
          >
            <TimeInput
              timer={timer}
              label="Work"
            />
            <TimeInput
              timer={timer}
              label="Rest"
            />
          </Flex>
          <PomodoroCount
            count={timer.count}
            emoji={timer.emoji}
          />
          {/* <PomodoroCount
            count={5}
            emoji={'🍅'}
          /> */}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};


export default TimerPopover;