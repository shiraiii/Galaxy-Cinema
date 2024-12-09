import { SET_ALERT, REMOVE_ALERT } from "../types/alerts";
const initialState = {
  alerts: [],
  showAlerts: false,
};

const setAlert = (state, { payload }) => ({
  ...state,
  alerts: [...state.alerts, payload],
  showAlerts: true,
});

const removeAlert = (state, { payload }) => ({
  ...state,
  alerts: [...state.alerts].filter((alert) => alert.id !== payload),
  showAlerts: false,
});

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SET_ALERT:
      return setAlert(state, action);
    case REMOVE_ALERT:
      return removeAlert(state, action);
    default:
      return state;
  }
}
