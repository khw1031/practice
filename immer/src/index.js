import React, { useCallback, memo } from "react";
import ReactDOM from "react-dom";
import { original } from "immer";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
import { getInitialState } from "./gifts";

import "./misc/index.css";

const Gift = memo(function Gift({ gift, users, currentUser, onReserve }) {
  return (
    <div className={`gift ${gift.reservedBy ? "reserved" : ""}`}>
      <img src={gift.image} alt={gift.description} />
      <div className="description">
        <h2>{gift.description}</h2>
      </div>
      <div className="reservation">
        {!gift.reservedBy ? (
          <button type="button" onClick={() => onReserve(gift.id)}>
            Reserve
          </button>
        ) : gift.reservedBy === currentUser.id ? (
          <button type="button" onClick={() => onReserve(gift.id)}>
            Unreserve
          </button>
        ) : (
          <span>{users[gift.reservedBy].name}</span>
        )}
      </div>
    </div>
  );
});

function GiftLists() {
  const [state, updateState] = useImmer(getInitialState());
  const { users, gifts, currentUser } = state;

  const handleAdd = () => {
    const description = prompt("Gift to Add");
    if (description) {
      updateState(
        draft =>
          void draft.gifts.push({
            id: uuidv4(),
            description,
            image: "https://picsum.photos/200?q=" + Math.random(),
            reservedBy: undefined,
          })
      );
    }
  };

  const handleReset = () => {
    updateState(_draft => getInitialState());
  };

  const handleReserve = useCallback(id => {
    updateState(draft => {
      const gift = draft.gifts.find(gift => gift.id === id);
      gift.reservedBy =
        gift.reservedBy === undefined
          ? original(draft.currentUser).id
          : gift.reservedBy === original(draft.currentUser).id
          ? undefined
          : gift.reservedBy;
    });
  }, []);

  return (
    <div className="app">
      <div className="header">
        <h1>Hi, {currentUser.name}</h1>
      </div>
      <div className="actions">
        <button type="button" onClick={handleAdd}>
          Add
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="gifts">
        {gifts.map(gift => (
          <Gift
            key={gift.id}
            gift={gift}
            users={users}
            currentUser={currentUser}
            onReserve={handleReserve}
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<GiftLists />, document.getElementById("root"));
