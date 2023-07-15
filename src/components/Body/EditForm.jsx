import React, { useState } from "react";
import "../../styles/editform.css";

const useInputState = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
      setValue(e.target.value);
    };
  
    return [value, handleChange];
  };
  
  const EditForm = (props) => {
    const [text, handleChangeText] = useInputState(props.startText);
    const [title, handleChangeTitle] = useInputState(props.startTitle);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      props.editTask(props.taskId, title, text);
      props.toggle();
    };
  
    return (
      <div className="edit-form-container">
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={title}
            onChange={handleChangeTitle}
            placeholder="Title"
          />
          <textarea
            value={text}
            onChange={handleChangeText}
            placeholder="Description"
            rows={4}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    );
  };
  
  export default EditForm;