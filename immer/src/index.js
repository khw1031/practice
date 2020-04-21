import React, { useReducer, useCallback, memo } from "react";
import ReactDOM from "react-dom";
import { original } from "immer";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
import { getInitialState, getBookDetails, giftReducer } from "./gifts";

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
  const [state, dispatch] = useReducer(giftReducer, getInitialState());
  const { users, gifts, currentUser } = state;

  const handleAdd = () => {
    const description = prompt("Gift to Add");
    if (description) {
      dispatch({
        type: "ADD_GIFT",
        id: uuidv4(),
        description,
        image: "https://picsum.photos/200?q=" + Math.random()
      });
    }
  };

  const handleReset = () => dispatch({ type: "RESET" });

  const handleReserve = useCallback(
    id => dispatch({ type: "TOGGLE_RESERVATION", id }),
    []
  );

  const handleAddBook = async () => {
    const isbn = prompt("Enter ISBN number", "0201558025");
    if (isbn) {
      const book = await getBookDetails(isbn);
      dispatch({ type: "ADD_BOOK", book });
    }
  };

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
        <button type="button" onClick={handleAddBook}>
          AddBook
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
