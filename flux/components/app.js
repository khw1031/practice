import React, { useState } from "react";
import Plot from "./plot";
import { connect } from "react-redux";
import {
  changeLocation,
  setSelectedDate,
  setSelectedTemp,
  fetchData,
} from "./state/actions";

const API_KEY = process.env.API_KEY;
const createUrlByLocation = location =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${API_KEY}&units=metric`;

function App({ state, dispatch }) {
  const onSubmit = e => {
    e.preventDefault();
    const encodedLocation = encodeURIComponent(state.get("location"));
    const url = createUrlByLocation(encodedLocation);
    dispatch(fetchData(url));
  };

  const onClick = data => {
    if (data.points) {
      const { x, y } = data.points[0];
      dispatch(setSelectedDate(x));
      dispatch(setSelectedTemp(y));
    }
  };

  const onChangeLocation = e => {
    dispatch(changeLocation(e.target.value));
  };

  let currentTemp = "Specify a Location";
  if (state.get("data") && state.getIn(["data", "list"])) {
    currentTemp = state.getIn(["data", "list", "0", "main", "temp"]);
  }

  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="location">I want to know the weather for</label>
        <input
          id="location"
          type="text"
          value={state.get("location")}
          onChange={onChangeLocation}
          placeholder={"City, Country"}
        />
      </form>
      <p>
        <span>
          {state.getIn(["selected", "temp"])
            ? state.getIn(["selected", "temp"])
            : currentTemp}
          °C
        </span>
        <span>
          {state.getIn(["selected", "temp"])
            ? state.getIn(["selected", "date"])
            : ""}
        </span>
      </p>
      {state.get("data") && state.getIn(["data", "list"]) && (
        <div>
          <Plot
            xData={state.get("dates")}
            yData={state.get("temps")}
            type="scatter"
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(App);
