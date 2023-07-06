import {
  Box,
  Text,
  Card,
} from "@chakra-ui/react";
import { VirtualTouchBar } from './VirtualTouchBar.js';
import { TaskList } from './TaskList.js';
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import { getBTTVariable, playSound, setBTTVariable } from "./apiService.js";
import { changeTaskWidgetText } from "./taskService.js";

const testTasks = require('./testTasks.json');


export const TaskListBody = ({initialTimer, initialTasks}) => {
  const [tasks, setTasks] = useState(initialTasks);
  const tasksRef = useRef();
  tasksRef.current = tasks;
  const [removedTask, setRemovedTask] = useState({});


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

  const completeTask = (completedTask, isWidgetTask) => {
    if (completedTask === undefined)
      completedTask = tasksRef.current[0];
    if (!completedTask.isCompleted)
      getBTTVariable('taskCompleteSound')
        .then(result => playSound(result));
    setTasks(tasksRef.current.map(task => {
      return task.id === completedTask.id
        ? {...completedTask, isCompleted: true}
        : task
      }
    ));
    console.log(completedTask, isWidgetTask);
    if (isWidgetTask) {
      changeTaskWidgetText(completedTask.content, true)
    }
    setTimeout(() => {
      console.log('marking task for deletion', completedTask)
      setRemovedTask(completedTask)
    }, 2250);
  };

  const addTask = () => {
    const newTask = {
      content: '',
      id: Math.trunc(Math.random() * (10 ** 10)),
      startEditing: true
    }
    setTasks(tasksRef.current.concat(newTask));
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
    if (tasks.length === 0) {
      const ghostTask = {
        content: '',
        id: -999,
        isGhost: true
      }
      setTasks([ghostTask]);
      changeTaskWidgetText('');
      return;
    }
    else if (tasks.length > 1 && tasks[0].isGhost && tasks[1].content) {
      setTasks(tasks.filter((task, index) => index !== 0))
    }
    getBTTVariable('cachedTasks')
    .then(cachedTasks => {
      if (cachedTasks[0].id !== tasks[0].id)
        changeTaskWidgetText(tasks[0].content);
    })
    .then(() => setBTTVariable('cachedTasks', tasks));
  }, [tasks]);

  useEffect(() => {
    console.log('removing task', removedTask)
    const newTasks = tasks.filter(task => task.id !== removedTask.id
      && task.content !== '');
    setTasks(newTasks);
    return;
  }, [removedTask])

  useEffect(() => {
    let isEventHandled = false;
    const taskWidgetEventHandler = async event => {
      if (!(event.detail.name === 'TBT_taskWidgetTapped'))
        return;
      console.log('firing taskWidgetEventHandler');
      if (!isEventHandled) {
        isEventHandled = true;
        completeTask(undefined, true);
      }
      setTimeout(() => {
        isEventHandled = false
      }, 50);
    };
    window.addEventListener('bttVarChanged', taskWidgetEventHandler);
    return () => {
      window.removeEventListener('bttVarChanged', taskWidgetEventHandler);
    }
  }, [])

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
            addTask={addTask}
            editTask={editTask}
            completeTask={completeTask}
            provided={provided}
          />
        }
      </Droppable>
    </Box>
  </DragDropContext>);
};

export default TaskListBody;