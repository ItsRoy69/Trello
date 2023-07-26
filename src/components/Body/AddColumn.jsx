import React, { useState, useEffect, useCallback } from "react";
import randomColor from "randomcolor";
import "../../styles/addcolumn.css";

const AddColumn = ({ openModal, columnId, addColumn, closeModal }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!openModal) {
      setTitle("");
    }
  }, [openModal]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newColumn = {
        id: columnId,
        name: title,
        limit: 10,
        color: randomColor({ luminosity: "light" }),
        taskIds: [],
      };
      addColumn(newColumn);
      closeModal();
    },
    [addColumn, closeModal, columnId, title]
  );

  return (
    <div
      className={`modal ${openModal ? "show" : "hide"}`}
      onClick={closeModal}
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
