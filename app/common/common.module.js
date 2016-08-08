import angular from "angular";
import Header from "./header.module";

const Common = angular
.module("app.common", [Header])
.name;


export default Common;
