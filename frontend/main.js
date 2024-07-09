import { Main } from "./components";
import { Header } from "./components";
import * as API from "./api";
import * as State from "./state";
import "./sass/index.scss"

document.addEventListener("DOMContentLoaded", async () => {
    const app = document.querySelector("#app");

    const headerElement = Header({API, State});
    app.appendChild(headerElement);

    const mainElement = Main({ API, State });
    app.appendChild(mainElement);
});
