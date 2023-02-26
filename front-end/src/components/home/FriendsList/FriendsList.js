import "./FriendsList.scss";
import search from "../../../assets/icons/search.png";
import AddFriendModal from "../AddFriendModal/AddFriendModal";
import { useContext, useState } from "react";
import { FriendContext } from "../../../pages/HomePage/HomePage";

function FriendsList({ onFriendClicked }) {
  const { friends, setFriends } = useContext(FriendContext);
  const [modal, setModal] = useState(false);

  const addFriend = () => {
    setModal(true);
  };

  return (
    <>
      <div className="homepage">
        <div className="friends-list">
          <div className="friends-list__add">
            <h1 className="friends-list__add-text">Add Friend</h1>
            <button onClick={addFriend} className="friends-list__add-button">
              <img src={search} alt="search" />
            </button>
          </div>
          {friends.map((friend) => {
            return (
              <div
                key={`friend:${friend}`}
                className="friends-list__list"
                onClick={() => onFriendClicked(friend)}
              >
                <div className="friends-list__friend">
                  <span
                    className={
                      friend.connected === false || friend.connected === "false"
                        ? "friends-list__status--unavailable"
                        : "friends-list__status--available"
                    }
                  ></span>
                  <h2 className="friends-list__name">{friend.username}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modal ? <AddFriendModal setModal={setModal} /> : ""}
    </>
  );
}

export default FriendsList;
