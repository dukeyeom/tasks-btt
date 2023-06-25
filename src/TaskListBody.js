import {
  Box,
  Text,
  Card,
} from "@chakra-ui/react";
import { VirtualTouchBar } from './VirtualTouchBar.js';
import { TaskList } from './TaskList.js';
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { changeTaskWidgetText, getBTTVariable, playSound, setBTTVariable } from "./apiService.js";

const testTasks = require('./testTasks.json');

window.addEventListener('bttVarChanged', (event) => {
});

export const TaskListBody = ({initialTimer, initialTasks}) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [removedTask, setRemovedTask]= useState({});

  const onDragEnd = result => {
    if (result.destination === null)
      return;
    if (result.source.index === result.destination.index)
      return;
    const movedTask = tasks.find(task => task.id === +result.draggableId);
    let newTasks = tasks.filter(task => task.id !== +result.draggableId);
    newTasks = [
      ...newTasks.slice(0, result.destination.index),
      movedTask,
      ...newTasks.slice(result.destination.index)
    ];
    setTasks(newTasks);
  };

  const handleEmptyState = async () => {
    if (tasks.length > 0)
      return;
    
    // const touchBarEnabled = await getBTTVariable('touchBarEnabled');
    const ghostTask = {
      content: 'All tasks completed!',
      id: -999,
      isGhost: true
    }
    setTasks([ghostTask]);
  }

  const completeTask = (completedTask) => {
    getBTTVariable('taskCompleteSound')
      .then(result => playSound(result));
    setTasks(tasks.map(task => {
      return task.id === completedTask.id
        ? {...completedTask, isCompleted: true}
        : task
      }
    ));
    setTimeout(() => {
      setRemovedTask(completedTask)
    }, 2250);
  };

  const addTask = () => {
    const newTask = {
      content: '',
      id: Math.trunc(Math.random() * (10 ** 10)),
      startEditing: true
    }
    setTasks(tasks.concat(newTask));
  }

  const editTask = (editTask, newContent) => {
    if (newContent === '') {
      setRemovedTask(editTask);
      return;
    }
    setTasks(tasks.map(task =>
      task.id === editTask.id
        ? {...task, content: newContent}
        : task
    ));
  };

  useEffect(() => {
    changeTaskWidgetText(tasks[0]?.content);
    setBTTVariable('cachedTasks', tasks);
    return;
  }, [tasks]);

  useEffect(() => {
    const newTasks = tasks.filter(task => task.id !== removedTask.id
      && task.content !== '');
    if (newTasks.length === 0) 
      handleEmptyState();
    else
      setTasks(newTasks);
    return;
  }, [removedTask])

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
          timer={initialTimer}
          firstTask={tasks[0]}
          completeTask={completeTask}
          editTask={editTask}
          provided={provided}
         />
        }
      </Droppable>
      <Droppable
        droppableId="list"
        direction="vertical"
      >
        {(provided) =>
          <TaskList
            tasks={tasks}
            editTask={editTask}
            completeTask={completeTask}
            addTask={addTask}
            provided={provided}
          />
        }
      </Droppable>
    </Box>
  </DragDropContext>);
};

export default TaskListBody;