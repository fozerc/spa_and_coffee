// import { initialState } from "./initialState";
//
// export const updateState = (state, key, data) => {
//   return {
//     ...initialState,
//     [state]: {
//       ...initialState[state],
//       [key]: data,
//     },
//   };
// };

import { initialState } from "./initialState";

export const updateState = (state, key, data) => {
  console.log(`Updating state: ${state}, key: ${key}, data: `, data);
  initialState[state] = {
    ...initialState[state],
    [key]: data,
  };
  console.log('Updated initialState:', initialState);
};

