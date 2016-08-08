import angular from "angular";
import InputComponent from "./input.component";

const Input = angular
.module("Input", [])
.component("inputComponent", InputComponent)
.value("EventEmitter", payload => ({ $event: payload}))
.name;

export default Input;
