import angular from "angular";
import inputUrlComponent from "./inputUrl.component.js";

const UI = angular
  .module("UI", [])
  .component("inputUrl", inputUrlComponent)
  .name;


export default UI;
