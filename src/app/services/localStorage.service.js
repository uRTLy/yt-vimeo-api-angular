import angular from 'angular';

export default class LocalStorage {
  constructor ($window) {
    this.window = $window;
  }
  updateStorage (state) {
    this.window.localStorage.setItem('state', angular.toJson(state));
  }
  retrieveFromStorage () {
    return angular.fromJson(this.window.localStorage.getItem('state'));
  }
}

LocalStorage.$inject = ['$window'];
