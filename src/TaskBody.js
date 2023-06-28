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
import { useState, useEffect } from 'react';
import './App.css';

export const TaskBody = ({task, addTask, editTask, completeTask, isWidget}) => {
  const [content, setContent] = useState(task.content);
  
  const startAsEditable = task.startEditing;
  useEffect(() => {
    delete task.startEditing;
  }, [])

  const [editFieldOpen, setEditFieldOpen] = useState();
  const EditableControl = () => {
    const editColor = isWidget ? "white" : "gray";
    let {isEditing, getEditButtonProps} = useEditableControls();
    useEffect(() => {
      setEditFieldOpen(isEditing);
    }, [isEditing]);
    return editFieldOpen
      ? null
      : <IconButton
        icon={<MdOutlineEdit
          color={editColor}
        />}
        size="sm"
        variant="ghost"
        position="absolute"
        right="8px"
        opacity="0"
        _hover={{opacity: "1"}}
        {...getEditButtonProps()}
      />
  };
  
  return (
  <HStack>
    {
      editFieldOpen
      ? null
      : <IconButton
        onClick={() => completeTask(task)}
        color={isWidget
          ? "white"
          : "gray"
        }
        borderRadius="15px"
        variant="ghost"
        size="xs"
        icon={
          task.isCompleted
          ? <MdOutlineRadioButtonChecked
              fontSize="21px"
            />
          : <MdOutlineRadioButtonUnchecked
              fontSize="21px"
            />
        }
      />
    }
    {
      task.isCompleted
      ? <Text
          padding="4px 0 4px 0"
          className='taskFadeout'
        >
          <strike>{task.content}</strike>
        </Text>
      : <Editable
        defaultValue={
          task.content
        }
        startWithEditView={startAsEditable}
        value={content}
        onChange={nextValue => setContent(nextValue)}
        onSubmit={value => {
          editTask(task, value);
          if (value !== '' && !isWidget) // && startAsEditable)
            setTimeout(() => addTask(), 10);
        }}
        onCancel={value => editTask(task, value)}
        display="flex"
        alignItems="center"
      >
        <EditablePreview
          cursor="grab"
        />
        <Input
          as={EditableInput}
          autoFocus
          flexWrap="none"
          height="max"
          width="278px"
        />
        <EditableControl />
      </Editable>
    }
  </HStack>
  );
}