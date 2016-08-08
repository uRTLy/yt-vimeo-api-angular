import controller from "./input.controller.js";

const Input = {
  bindings: {
    inputOptions: "<",
    state: "<",
    updateState: "&",
    getData: "&",
    removeVideos: "&"
  },
  controller,
  templateUrl: "./templates/input.template.html"
};


export default Input;
