import angular from "angular";
import HeaderComponent from "./header.component.js";

const Header = angular
.module("Header", [])
.component("header", HeaderComponent)
.name;

export default Header;
