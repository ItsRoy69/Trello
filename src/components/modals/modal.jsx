import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "../../styles/modals.css";

const Modal = (props) => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const idColumn = props.columnData;

  const newTask = {
    id: uuid(),
    text: text,
    idColumn: idColumn,
    title: title,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTask(newTask);
  };

  return (
    <div open={props.openModal} onClose={props.closeModal}>
      <div className="modals">
        <form onSubmit={handleSubmit}>
          <input
            label="Title"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChangeTitle}
            required
          />
          <textarea
            label="Description"
            rows={4}
            value={text}
            onChange={handleChangeText}
            name="task"
            id="task"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
