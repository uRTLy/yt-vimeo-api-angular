import angular from "angular";
import ListResultsComponent from "./results.component";


const ListResults = angular
.module("ListResults", [])
.component("listResults", ListResultsComponent)
.name;

export default ListResults;
