import { useEffect, useState } from "react";
import columnsRawData from "../Data/data";
import Column from "./Column";
import Modal from "../modals/modal";
import { DragDropContext } from "react-beautiful-dnd";
import AddColumn from "./AddColumn";

const Trello = () => {
  const [openColModal, setOpenColModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem("columns")) || columnsRawData
  );
  const [modal, setModal] = useState(false);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      const [removedTask] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, removedTask);

      const newColumnsState = columns.map((c) =>
        c.id === start.id ? { ...c, taskIds: newTaskIds } : c
      );
      setColumns(newColumnsState);
    } else {
      if (finish.taskIds.length < finish.limit) {
        const startTaskIds = Array.from(start.taskIds);
        const [removedTask] = startTaskIds.splice(source.index, 1);
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, removedTask);

        const newColumnsState = columns.map((c) => {
          if (c.id === start.id) {
            return { ...c, taskIds: startTaskIds };
          } else if (c.id === finish.id) {
            return { ...c, taskIds: finishTaskIds };
          }
          return c;
        });

        setColumns(newColumnsState);
      }
    }
  };

  const openModal = (data) => {
    setModal(data.id);
    setOpen(true);
  };

  const closeModal = () => {
    setModal(false);
    setOpen(false);
  };

  const closeColModal = () => {
    setOpenColModal(false);
  };

  const addTask = (newTask) => {
    setModal(false);
    const updatedColumns = columns.map((column) =>
      column.id === newTask.idColumn && column.taskIds.length < 5
        ? { ...column, taskIds: [...column.taskIds, newTask] }
        : column
    );
    setColumns(updatedColumns);
  };

  const removeTask = (taskId) => {
    const updatedColumns = columns
      .map((column) => ({
        ...column,
        taskIds: column.taskIds.filter((task) => task.id !== taskId),
      }))
      .filter((column) => column.taskIds.length > 0);
    setColumns(updatedColumns);
  };

  const removeColumn = (columnId) => {
    const updatedColumns = columns.filter((item) => item.id !== columnId);
    setColumns(updatedColumns);
  };

  const editTask = (taskId, newTitle, newText) => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      taskIds: column.taskIds.map((task) =>
        task.id === taskId ? { ...task, title: newTitle, text: newText } : task
      ),
    }));
    setColumns(updatedColumns);
  };

  const addColumn = (newColumn) => {
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  useEffect(() => {
    window.localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <>
        <AddColumn
          openModal={openColModal}
          closeModal={closeColModal}
          addColumn={addColumn}
          columnId={columns.length + 1}
        />
        {modal && (
          <Modal
            openModal={open}
            closeModal={closeModal}
            addTask={addTask}
            columnData={modal}
          />
        )}
        <div style={{ display: "flex", flexDirection: "row" }}>
          {columns.map((c) => (
            <Column
              columnData={c}
              key={c.id}
              openModal={openModal}
              removeTask={removeTask}
              removeColumn={removeColumn}
              editTask={editTask}
            />
          ))}
        </div>
      </>
    </DragDropContext>
  );
};

export default Trello;
