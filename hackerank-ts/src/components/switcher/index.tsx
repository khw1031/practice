import React, { useState, useEffect } from "react";

const Store = {
  _handlers: [],
  _flag: false,
  subscribe: function(handler) {
    this._handlers.push(handler);
  },
  set: function(value) {
    this._flag = value;
    this._handlers.forEach(handler => handler(value));
  },
  get: function() {
    return this._flag;
  },
};

// <Switcher value={this.state.value} onChange={Store.set.bind(Store)} />

function Switcher() {
  const [value, setValue] = useState(Store.get());

  useEffect(() => {
    Store.subscribe(setValue);
  }, []);

  const onChange = value => () => Store.set(value);

  return (
    <button onClick={onChange(!value)}>
      {value ? "lights on" : "lights off"}
    </button>
  );
}

export { Switcher };
