import controller from './input.controller.js';
import template from './input.template.html';

const Input = {
  bindings: {
    state: '<',
    updateState: '&',
    getData: '&'
  },
  controller,
  template
};


export default Input;
