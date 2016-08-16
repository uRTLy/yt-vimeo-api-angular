import controller from './results.controller';
import template from  './results.template.html';

const ListResultsComponent = {
  bindings: {
    state: '<',
    updateAvailablePages: '&',
    updateState: '&'
  },
  controller,
  template
} ;

export default ListResultsComponent;
