import { Center, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import { Draggable } from "@hello-pangea/dnd";
import {
  MdOutlineTimer,
  MdOutlinePause,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { TaskBody } from './TaskBody';
import { timerService } from './timerService.js';
import { getBTTVariable } from "./apiService";
import { useEffect, useRef, useState } from "react";


const VirtualTimerWidget = ({timer}) => {
  const timerRef = useRef(null);
  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      console.log('Click and hold event triggered');
      setHandleClick(null);
      setTimeout(() => {
        setHandleClick(() => timerService.handleTimerTapped);
      }, 1000)
      timerService.handleTimerHeld();
    }, 1500); // Adjust the duration for how long the click needs to be held
  }
  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
  }

  const [timerObj, setTimerObj] = useState(timer);
  const [handleClick, setHandleClick] = useState(() => timerService.handleTimerTapped);
  // const timerChangeHandler = (event) => {
  //   if (event.detail.name === 'TBT_timer') {
  //     getBTTVariable('timer')
  //       .then(result => setTimerObj(result))
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener('bttVarChanged', timerChangeHandler);
  //   return () => {
  //     window.removeEventListener('bttVarChanged', timerChangeHandler)
  //   }
  // }, [])

  return (
    <Flex
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      alignItems="center"
      backgroundColor={timerObj.onWorkInterval ? "red" : "dodgerblue"}
      height="30px"
      borderRadius="5px"
      padding="7px"
      color="white"
      fontSize="16px"
      fontWeight="600"
      cursor="pointer"
    >
      <Center fontSize="23px">
        {
          timerObj.isPaused
            ? <MdOutlinePause/>
            : <MdOutlineTimer/>
        }
      </Center>
      <Spacer
        width="5px"
      />
      <Text
        flexWrap="nowrap"
        minWidth="max"
        width="max"
      >
        {timerObj.content}
      </Text>
    </Flex>
  );
};

const VirtualTaskWidget = ({task, completeTask, editTask}) => {
  if (task.isGhost)
    return (
      <Text
        whiteSpace="nowrap"
        paddingLeft="10px"
        color="gray"
        fontWeight="600"
      >
        All tasks completed
      </Text>
    )

  return (
    <Draggable
      key={task.id}
      draggableId={String(task.id)}
      index={0}
    >
      {(provided) =>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#616161",
            height: "30px",
            borderRadius: "5px",
            padding: "7px 14px 7px 7px",
            color: "white",
            fontSize: "15px",
            fontWeight: "600",
            whiteSpace: "nowrap",
            ...provided.draggableProps.style
          }}
        >
          <TaskBody
            task={task}
            editTask={editTask}
            completeTask={completeTask}
            isWidget={true}
          />
          {/* <Center>
            <IconButton
              borderRadius="15px"
              variant="ghost"
              size="xs"
              icon={<MdOutlineRadioButtonUnchecked
                fontSize="21px"
                color="white"
              />}
            />
          </Center>
          <Spacer
            width="7px"
          />
          <Text>
            {task.content}
          </Text> */}
        </div>
      }
    </Draggable>
  );
};

export const VirtualTouchBar = ({timer, firstTask, editTask, completeTask, provided}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        position: "relative",
        width: "full",
        height: "40px",
        backgroundColor: "black",
        borderRadius: "7px 0 0 7px",
        margin: "5px 0 0 5px",
        padding: "15px 0 15px 15px",
        overflow: "hidden"
        // ...provided.droppableProps.style,
      }}
    >
      <Flex
        className="innerVirtualTouchBar"
        alignItems="center"
        gap="5px"
        width="max"
        overflowX="scroll"
        overflowY="hidden"
        paddingRight="10px"
      >
        {/* <VirtualTimerWidget
          timer={timer}
        /> */}
        {
          firstTask
          ? <VirtualTaskWidget
              completeTask={completeTask}
              editTask={editTask}
              task={firstTask}
            />
          : null
        }
      {provided.placeholder}
      </Flex>
    </div>
  );
};

export default VirtualTouchBar;