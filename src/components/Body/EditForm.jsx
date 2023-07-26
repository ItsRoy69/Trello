import React, { useState } from "react";
import "../../styles/editform.css";

const EditForm = ({ startText, startTitle, taskId, editTask, toggle }) => {
  const [text, setText] = useState(startText);
  const [title, setTitle] = useState(startTitle);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(taskId, title, text);
    toggle();
  };

  return (
    <div className="edit-form-container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Description"
          rows={4}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditForm;
