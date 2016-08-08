import angular from "angular";
import ListResults from "./results.module";
import Input from "./input.module";

const Components = angular
.module("app.components" , [ListResults, Input])
.name;


export default Components;
