import angular from 'angular';
import AppComponent from './app.component';
import Components from './components/components.module';
import Common from './common/common.module';
import ngMaterial from 'angular-material';
import FetchData from './services/fetchData.service.js';
import HandleUsersInput from './services/handleUsersInput.service.js';
import LocalStorage from './services/localStorage.service.js';
import Pagination from './services/pagination.service.js';

const root = angular
.module('ytVimeoApp', [Components, Common, ngMaterial])
.component('app', AppComponent)
.service('LocalStorage', LocalStorage)
.service('Pagination', Pagination)
.service('HandleUsersInput', HandleUsersInput)
.service('FetchData', FetchData)
.name;


export default root;
