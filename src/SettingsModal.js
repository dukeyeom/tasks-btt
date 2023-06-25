import {
  Button,
  Input,
  Heading,
  Select,
  Stack,
  HStack,
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Divider,
} from '@chakra-ui/react';
import {
  getBTTVariable,
  setBTTVariable,
  changeTimerVariable,
  playSound
} from './apiService';

import { QuestionIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

const SoundSelect = ({type}) => {
  const [selection, setSelection] = useState(null);
  useEffect(() => {
    if (type.includes('task'))
      getBTTVariable(`${type}Sound`)
        .then(result => setSelection(result))
    else
      getBTTVariable(`timer`)
        .then(result => setSelection(result[`${type}Sound`]))
  }, []);
  return <Select
    value={selection}
    onChange={event => {
      playSound(event.target.value);
      if (type.includes('task'))
        setBTTVariable(`${type}Sound`, event.target.value)
      else
        changeTimerVariable(`${type}Sound`, event.target.value)
      setSelection(event.target.value);
    }}
  >
    <option value="Airplane">Airplane</option>
    <option value="BassDrop">Bass Drop</option>
    <option value="Complete">Complete</option>
    <option value="Decide">Decide</option>
    <option value="Ding">Ding</option>
    <option value="Done">Done</option>
    <option value="Marimba">Marimba</option>
    <option value="Pop">Pop</option>
    <option value="Ringtone">Ringtone</option>
    <option value="RisingChord">Rising Chord</option>
    <option value="Select">Select</option>
    <option value="Start">Start</option>
    <option value="SwipeCard">Swipe Card</option>
    <Divider />
    <option value="None">None</option>
  </Select>;
}

export const SettingsModal = ({isOpen, onClose}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalContent
          width="310px"
          top="4px"
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          padding="5px"
        >
          <ModalHeader
            padding="0 0 0 0"
            display="flex"
            justifyContent="space-between"
            borderBottomWidth="1px"
          >
            <Heading
              padding="0 5px 5px 5px"
              fontSize="25px"
            >
              Settings
            </Heading>
            <ModalCloseButton
              position="static"
            />
          </ModalHeader>
          <ModalBody>
            <Stack spacing="3">
              <Heading size="md">Todoist</Heading>
              <Heading size="xs">
                API token&nbsp;
                <Tooltip
                  label="Found in Settings > Integrations > Developer"
                >
                  <QuestionIcon />
                </Tooltip>
              </Heading>
              <Input
                type="password"
              />
              <Heading size="xs">Name of project to sync tasks with</Heading>
              <Input
                placeholder='"Inbox" by default'
              />
              <Heading size="xs">Import tasks with this label</Heading>
              <Input
                placeholder='"@tbt" by default'
              />
              <hr />
              <Heading size="md">Timer widget</Heading>
              <HStack>
                <Heading size="xs">Enable icon</Heading>
                &nbsp;
                <Checkbox />
              </HStack>
              <Heading size="xs">Time display</Heading>
              <Select>
                <option value="">mm:ss</option>
                <option value="">mm min</option>
                <option value="">mm</option>
                <option value="">Progress bar</option>
              </Select>
              <Heading size="xs">Change Pomodaro count emoji</Heading>
              <Heading size="xs">Day starts at</Heading>
              <Heading size="xs">Timer start sound</Heading>
              <SoundSelect
                type="start"
              />
              <Heading size="xs">Work interval completion sound</Heading>
              <SoundSelect
                type="work"
              />
              <Heading size="xs">Rest interval completion sound</Heading>
              <SoundSelect
                type="rest"
              />
              <hr />
              <Heading size="md">Task widget</Heading>
              <HStack>
                <Heading size="xs">Enable icon</Heading>
                &nbsp;
                <Checkbox />
              </HStack>
              <Heading size="xs">Maximum width of task widget</Heading>
              <Slider>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Heading size="xs">Task completion sound</Heading>
              <SoundSelect
                type="taskComplete"
              />
              <hr />
              <Heading size="md">App</Heading>
              <Heading size="xs">Set color theme</Heading>
              <Select>
                <option value="">Light</option>
                <option value="">Dark</option>
                <option value="">System</option>
              </Select>
              <HStack>
                <Heading size="xs">
                  Enable delay before calling BTT functions
                  &nbsp;
                  <Tooltip
                    label="This app relies on BTT injecting functions into it
                    in order to manage the Touch Bar. If the app is failing to update the Touch Bar,
                    it could be because it attempts to call these functions before BTT has had
                    time to inject them, in which case, try enabling this option."
                  >
                    <QuestionIcon />
                  </Tooltip>
                </Heading>
                <Checkbox />
              </HStack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default SettingsModal;