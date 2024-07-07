import axios from "axios";
import { paths } from "./paths";

const URL = "http://localhost:8000/api/";

export const request = async ({ type, path, data = null, updateState }) => {
  try {
    const url = `${URL}${paths[path]}`;
    let response;

    if (type === "get" || type === "delete") {
      response = await axios[type](url);
    } else {
      response = await axios[type](url, data);
    }

    console.log(response);

    updateState(path, "data", response.data);
  } catch (error) {
    updateState(path, "error", error.message);
    throw error;
  }
};
