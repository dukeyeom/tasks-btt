import {
  HStack,
  Button,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  Input,
  Text,
} from '@chakra-ui/react';
import {
  MdOutlineAdd,
  MdOutlineEdit,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked
} from "react-icons/md";
import { Draggable } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';
import { createRipples } from 'react-ripples';
import './App.css';
import { TaskBody } from './TaskBody.js';

const TaskCard = ({task, addTask, editTask, completeTask, index}) => {
  return (
    <Draggable
      key={task.id}
      draggableId={String(task.id)}
      index={index}
    >
      {(provided) => 
        <div
          className={task.isCompleted ? "taskFadeout" : null}
          onContextMenu={() => false}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            display: "flex",
            width: "96%",
            margin: "2%",
            padding: "5px",
            fontSize: "17px",
            fontWeight: "500",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            backgroundColor: "white",
            borderRadius: "7px",
            overflow: "hidden",
            ...provided.draggableProps.style
          }}
        >
          <TaskBody
            task={task}
            addTask={addTask}
            editTask={editTask}
            completeTask={completeTask}
          />
        </div>
      }
    </Draggable>
  );
};

const NewTaskButton = ({addTask}) => {
  return (
    <Button
      onClick={() => addTask()}
      leftIcon={<MdOutlineAdd fontSize="25px" />}
      margin="5px"
      size="sm"
      width="290px"
      fontSize="15px"
      variant="outline"
    >
      New Task
    </Button>
  );
};

export const TaskList = ({tasks, addTask, editTask, completeTask, provided}) => {
  return (
  <div
    ref={provided.innerRef}
    {...provided.droppableProps}
    style={{
      position: "relative",
      height: "89.5%",
      overflowX: "hidden",
      overflowY: "scroll",
      borderRadius: "13px",
      ...provided.droppableProps.style,
    }}
  > 
    {tasks.map((task, index) =>
      index === 0
      ? null
      : <TaskCard
          key={task.id}
          index={index}
          task={task}
          addTask={addTask}
          editTask={editTask}
          completeTask={completeTask}
        />
    )}
    {provided.placeholder}
    <NewTaskButton
      addTask={addTask}
    />
  </div>
  );
};

export default TaskList;