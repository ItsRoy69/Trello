import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import "../../styles/column.css";

const Column = (props) => {
  return (
    <div>
      <div className="column-header">
        <div className="column-title">
          {props.columnData.name} ({props.columnData.taskIds.length})
        </div>
        <button
          className="delete-button"
          onClick={(e) => {
            e.preventDefault();
            props.removeColumn(props.columnData.id);
          }}
        >
          Del
        </button>
      </div>
      <Droppable droppableId={`${props.columnData.id - 1}`}>
        {(provided, snapshot) => (
          <div
            className="task-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.columnData.taskIds.map((task, index) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  task={task}
                  color={props.columnData.color}
                  index={index}
                  removeTask={props.removeTask}
                  editTask={props.editTask}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="add-button-container">
        <button
          className="add-button"
          onClick={() => props.openModal(props.columnData)}
          disabled={props.columnData.taskIds.length >= 5 ? true : false}
        >
          Add a Card
        </button>
      </div>
    </div>
  );
};

export default Column;
