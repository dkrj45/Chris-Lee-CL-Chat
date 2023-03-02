import "./AddFriendModal.scss";
import { useContext, useState } from "react";
import { FriendContext, SocketContext } from "../../../pages/HomePage/HomePage";

const AddFriendModal = ({ setModal }) => {
  const [error, setError] = useState("");

  const { setFriends } = useContext(FriendContext);
  const { socket } = useContext(SocketContext);

  const removeModal = () => {
    setModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit(
      "add_friend",
      e.target.name.value,
      ({ errorMsg, done, newFriend }) => {
        if (done) {
          setFriends((c) => [newFriend, ...c]);
          setError("");
          removeModal();
          return;
        }
        setError(errorMsg);
      }
    );
    e.target.reset();
  };

  return (
    <div className="modal" onClick={removeModal}>
      <div
        className="modal__content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="modal__close" onClick={removeModal}>
          &times;
        </span>
        <h1 className="modal__title">Add a friend!</h1>
        <div className="modal__error-container">
          <h2 className="modal__error">{error}</h2>
        </div>
        <form onSubmit={submitHandler}>
          <label className="modal__form-label">
            Friend's Username
            <input
              className="modal__form-name"
              type="text"
              name="name"
              placeholder="Chris Lee"
            ></input>
          </label>
          <button className="modal__form-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddFriendModal;
