import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "../../styles/modals.css";

const Modal = (props) => {
  const [formData, setFormData] = useState({
    text: "",
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const idColumn = props.columnData;

  const newTask = {
    id: uuid(),
    text: formData.text,
    idColumn: idColumn,
    title: formData.title,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTask(newTask);
  };

  return (
    <React.Fragment>
      {props.openModal && (
        <div className="modals">
          <form onSubmit={handleSubmit}>
            <input
              label="Title"
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              label="Description"
              rows={4}
              value={formData.text}
              onChange={handleChange}
              name="text"
              id="task"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default Modal;
