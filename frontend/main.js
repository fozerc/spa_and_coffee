import * as Components from "./components/index.js"

const { Header } = Components;

document.querySelector("#app").innerHTML = `
    ${Header()}
`
