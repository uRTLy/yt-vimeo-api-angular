import controller from "./results.controller";


const ListResultsComponent = {
  bindings: {
    state: "<",
    updatePages: "&",
    updateState: "&"
  },
  controller,
  templateUrl: "./templates/results.template.html"
} ;

export default ListResultsComponent;
