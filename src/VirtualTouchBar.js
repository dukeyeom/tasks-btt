import { Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { Draggable } from "@hello-pangea/dnd";
import {
  MdOutlineTimer,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked
} from "react-icons/md";

const VirtualTimerWidget = () => {
  return (
    <Flex
      alignItems="center"
      backgroundColor="red"
      height="30px"
      borderRadius="5px"
      padding="7px"
      color="white"
      fontSize="16px"
      fontWeight="600"
      cursor="pointer"
    >
      <Center>
        <MdOutlineTimer
          fontSize="23px"
        />
      </Center>
      <Spacer
        width="5px"
      />
      <Text
        flexWrap="nowrap"
        minWidth="max"
        width="max"
      >
        25 min
      </Text>
    </Flex>
  );
};

const VirtualTaskWidget = ({task}) => {
  return (
    <Draggable
      key={task.id}
      draggableId={String(task.id)}
      index={1}
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
          <Center>
            <MdOutlineRadioButtonUnchecked
              fontSize="21px"
            />
          </Center>
          <Spacer
            width="7px"
          />
          <Text>
            {task.content}
          </Text>
        </div>
      }
    </Draggable>
  );
};

export const VirtualTouchBar = ({firstTask, provided}) => {
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
        borderRadius: "7px",
        margin: "5px 5px 0 5px",
        padding: "15px 0 15px 15px",
        overflow: "hidden"
        // ...provided.droppableProps.style,
      }}
    >
      <Flex
        className="innerVirtualTouchBar"
        gap="5px"
        width="max"
        overflow="scroll"
        paddingRight="10px"
      >
        <VirtualTimerWidget />
        <VirtualTaskWidget
          task={firstTask}
        />
      {provided.placeholder}
      </Flex>
    </div>
  );
};

export default VirtualTouchBar;