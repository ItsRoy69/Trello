import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import "../../styles/addcolumn.css";

const AddColumn = (props) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!props.openModal) {
      setTitle("");
    }
  }, [props.openModal]);

  const newColumn = {
    id: props.columnId,
    name: title,
    limit: 10,
    color: randomColor({ luminosity: "light" }),
    taskIds: [],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addColumn(newColumn);
    props.closeModal();
  };

  return (
    <div
      className={`modal ${props.openModal ? "show" : "hide"}`}
      onClick={props.closeModal}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text-field"
          />
          <button type="submit" className="button">
            Add New Column
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColumn;
