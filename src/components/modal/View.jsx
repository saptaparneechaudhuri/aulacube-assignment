import "./view.css";

const View = ({ onClose, content, deleteItem, editItem }) => {
  return (
    <div className="modal">
      <button onClick={onClose} className="btn-modal btn-close">
        Close
      </button>
      <div className="modal-content">
        <p> {content}</p>
      </div>
      <div className="btn-container">
        <button className="btn-modal btn-edit" onClick={editItem}>
          Edit
        </button>
        <button className="btn-modal btn-delete" onClick={deleteItem}>
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
};

export default View;
