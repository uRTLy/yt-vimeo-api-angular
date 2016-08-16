import angular from "angular";
import Header from "./Header/header.module";

const Common = angular
.module("app.common", [Header])
.name;


export default Common;
