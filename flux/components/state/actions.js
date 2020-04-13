export function changeLocation(location) {
  return {
    type: "CHANGE_LOCATION",
    location,
  };
}

export function setSelectedDate(date) {
  return {
    type: "SET_SELECTED_DATE",
    date,
  };
}

export function setSelectedTemp(temp) {
  return {
    type: "SET_SELECTED_TEMP",
    temp,
  };
}

export function setData(data) {
  return {
    type: "SET_DATA",
    data,
  };
}

export function setDates(dates) {
  return {
    type: "SET_DATES",
    dates,
  };
}

export function setTemps(temps) {
  return {
    type: "SET_TEMPS",
    temps,
  };
}

export function fetchData(url) {
  return function thunk(dispatch) {
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const dates = [];
        const temps = [];
        for (const { dt_txt, main } of data.list) {
          dates.push(dt_txt);
          temps.push(main.temp);
        }
        dispatch(setData(data));
        dispatch(setDates(dates));
        dispatch(setTemps(temps));
        dispatch(setSelectedDate(""));
        dispatch(setSelectedTemp(null));
      })
      .catch(console.error);
  };
}
