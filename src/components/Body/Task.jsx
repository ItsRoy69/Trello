import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react"; 
import '../../styles/task.css'
import EditForm from "./EditForm.jsx";

function useToggle(initialVal = false) {
    const [state, setState] = useState(initialVal);
    const toggle = () => {
      setState(!state);
    };
    return [state, toggle];
  }
  
  const Task = (props) => {
    const [isEditing, toggle] = useToggle(false);
  
    const handleEditClick = () => {
      toggle();
    };
  
    const handleDeleteClick = () => {
      props.removeTask(props.task.id);
    };
  
    return (
      <Draggable draggableId={`${props.task.id}`} index={props.index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="task-card"
          >
            {isEditing ? (
              <EditForm
                color={props.color}
                editTask={props.editTask}
                taskId={props.task.id}
                toggle={toggle}
                startTitle={props.task.title}
                startText={props.task.text}
              />
            ) : (
              <>
                <div className="task-content">
                  <div>
                    <span>{props.task.title}</span>
                  </div>
                </div>
                <div className="task-actions">
                  <button onClick={handleEditClick}>Edit</button>
                  <button onClick={handleDeleteClick}>Delete</button>
                </div>
              </>
            )}
          </div>
        )}
      </Draggable>
    );
  };
  
  export default Task;