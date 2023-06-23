import {
  Card,
  CardBody,
  HStack,
  VStack,
  Text,
  Spacer,
  Box
} from '@chakra-ui/react';
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked
} from "react-icons/md";
import { Draggable } from '@hello-pangea/dnd';

const TaskCard = ({task, index}) => {
  return (
  <Draggable
    draggableId={String(task.id)}
    index={index}
  >
    {(provided) =>
    <Card
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      innerRef={provided.innerRef}
      width="96%"
      fontSize="17px"
      fontWeight="500"
      boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
    >
      <CardBody
        padding="5px 8px 5px 8px"
      >
        <HStack >
        <Box minWidth="21px">
        <MdOutlineRadioButtonUnchecked
          fontSize="21px"
          color="gray"
        /></Box>
        <Text>{task.content}</Text>
        </HStack>
      </CardBody>
    </Card>
    }
  </Draggable>
  );
};

export const TaskList = ({tasks}) => {
  return (
  <VStack
    position="relative"
    height="88%"
    overflowY="scroll"
    borderRadius="13px"
  > 
    {tasks.map((task, index) =>
      <TaskCard key={task.id} task={task} index={index} />
    )}
  </VStack>
  );
};

export default TaskList;