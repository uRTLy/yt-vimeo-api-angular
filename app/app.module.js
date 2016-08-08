import angular from "angular";
import AppComponent from "./app.component";
import Components from "./components.module";
import Common from "./common.module";
import ngMaterial from "angular-material";
import FetchData from "./fetchData.service.js";
import PrepareURLs from "./prepareURLs.service.js";
import CookiesService from "./app.cookies.service.js";
import PaginationService from "./pagination.service.js";

const root = angular
.module("app", [Components, Common, ngMaterial])
.component("app", AppComponent)
.service("CookiesService", CookiesService)
.service("PaginationService", PaginationService )
.service("PrepareURLs", PrepareURLs)
.service("FetchData", FetchData )
.name;


export default root;
