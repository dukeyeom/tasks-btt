import {
  Box,
  Text,
  Card,
} from "@chakra-ui/react";
import { VirtualTouchBar } from './VirtualTouchBar.js';
import { TaskList } from './TaskList.js';
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const testTasks = require('./testTasks.json');

export const TaskListBody = () => {

  const onDragEnd = result => {
    return null;
  };

  return (
  <DragDropContext
    onDragEnd={onDragEnd}
  >
    <Box
      backgroundColor="white"
      h="443px"
      borderRadius="0 0 15px 15px"
      overflow="hidden"
    >
      <Droppable droppableId="touchbar">
        {() => <VirtualTouchBar />}
      </Droppable>
      <Droppable droppableId="list">
        {(provided) =>
          <TaskList
            tasks={testTasks}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
          </TaskList>
        }
      </Droppable>
    </Box>
  </DragDropContext>);
};

export default TaskListBody;