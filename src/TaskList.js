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
      key={task.id}
      draggableId={String(task.id)}
      index={index}
    >
      {(provided) => 
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            display: "flex",
            width: "96%",
            margin: "2%",
            padding: "3px",
            fontSize: "17px",
            fontWeight: "500",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            backgroundColor: "white",
            borderRadius: "7px",
            ...provided.draggableProps.style
          }}
        >
          <HStack >
            <Box minWidth="21px">
            <MdOutlineRadioButtonUnchecked
              fontSize="21px"
              color="gray"
            /></Box>
            <Text>{task.content}</Text>
          </HStack>
        </div>
      }
    </Draggable>
  );
};

export const TaskList = ({tasks, provided}) => {
  return (
  <div
    ref={provided.innerRef}
    {...provided.droppableProps}
    style={{
      position: "relative",
      height: "89.5%",
      overflowY: "scroll",
      borderRadius: "13px",
      ...provided.droppableProps.style,
    }}
  > 
    {tasks.map((task, index) =>
      index === 0
      ? null
      : <TaskCard key={task.id} task={task} index={index} />
    )}
    {provided.placeholder}
  </div>
  );
};

export default TaskList;