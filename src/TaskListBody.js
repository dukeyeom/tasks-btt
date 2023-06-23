import {
  Box,
  Text,
  Card,
} from "@chakra-ui/react";
import { VirtualTouchBar } from './VirtualTouchBar.js';
import { TaskList } from './TaskList.js';
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";

const testTasks = require('./testTasks.json');

export const TaskListBody = () => {
  const [tasks, setTasks] = useState(testTasks);

  const onDragEnd = result => {
    console.log(result);
    
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
      <Droppable
        droppableId="touchbar"
        direction="horizontal"
      >
        {(provided) =>
         <VirtualTouchBar
          firstTask={tasks[0]}
          provided={provided}
         />
        }
      </Droppable>
      <Droppable droppableId="list">
        {(provided) =>
          <TaskList
            tasks={tasks}
            provided={provided}
          />
        }
      </Droppable>
    </Box>
  </DragDropContext>);
};

export default TaskListBody;