import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import "../../styles/column.css";
const Column = ({  columnData,  removeColumn,  openModal,  removeTask,  editTask }) => { const { id, name, taskIds, color } = columnData;

  const handleRemoveColumn = (e) => {
    e.preventDefault();
    removeColumn(id);
  };

  const handleAddCardClick = () => {
    if (taskIds.length >= 5) return;
    openModal(columnData);
  };

  return (
    <div>
      <div className="column-header">
        <div className="column-title">
          {name} ({taskIds.length})
        </div>
        <button className="delete-button" onClick={handleRemoveColumn}>
          Del
        </button>
      </div>
      <Droppable droppableId={`${id - 1}`}>
        {(provided, snapshot) => (
          <div
            className="task-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ backgroundColor: color }}
          >
            {taskIds.map((taskId, index) => (
              <Task
                key={taskId.id}
                task={taskId}
                color={color}
                index={index}
                removeTask={removeTask}
                editTask={editTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="add-button-container">
        <button
          className="add-button"
          onClick={handleAddCardClick}
          disabled={taskIds.length >= 5}
        >
          Add a Card
        </button>
      </div>
    </div>
  );
};

export default Column;
