import angular from "angular";
import ListResults from "./ListResults/results.module";
import Input from "./Input/input.module";

const Components = angular
.module("app.components" , [ListResults, Input])
.name;


export default Components;
