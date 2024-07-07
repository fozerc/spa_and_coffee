import { initialState } from "./initialState";

export const updateState = (state, key, data) => {
  return {
    ...initialState,
    [state]: {
      ...initialState[state],
      [key]: data,
    },
  };
};
