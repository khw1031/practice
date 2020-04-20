import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { getInitialState, addGift, toggleReservation } from "./gifts";

import "./misc/index.css";

function Gift({ gift, users, currentUser, onReserve }) {
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
}

function GiftLists() {
  const [state, setState] = useState(getInitialState());
  const { users, gifts, currentUser } = state;

  const handleAdd = () => {
    const description = prompt("Gift to Add");
    if (description) {
      setState(state =>
        addGift(
          state,
          uuidv4(),
          description,
          "https://picsum.photos/200?q=" + Math.random()
        )
      );
    }
  };

  const handleReserve = useCallback(id => {
    setState(state => toggleReservation(state, id));
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
