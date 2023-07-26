import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import EditForm from "./EditForm.jsx";
import "../../styles/task.css";

const Task = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = () => {
    props.removeTask(props.task.id);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: Date.now(),
        content: newComment.trim(),
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
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
              toggle={handleEditClick}
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

              <div className="task-comments">
                <div className="existing-comments">
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      {comment.content}
                    </div>
                  ))}
                </div>
                <div className="new-comment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={handleCommentChange}
                  />
                  <button onClick={handleAddComment}>Add Comment</button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
