/* eslint-disable */
import AppComponent from './app.component';

describe('Main App Component', () => {
  let scope;
  let ctrl;


  beforeEach(angular.mock.module('ytVimeoApp'));
    describe('App Controller', () => {

      beforeEach(inject(($componentController) => {
        ctrl = $componentController('app');
        ctrl.$onInit();
      }))

      it('should call $onInit and set up state', () => {
        spyOn(ctrl, '$onInit');
        expect(ctrl.$onInit).toHaveBeenCalled();
      });

    });

  });
