import angular from "angular";


export default class InputController{
  constructor(EventEmitter, PrepareURLs){
    this.emit = EventEmitter;
    this.PrepareURLs = PrepareURLs;
    this.usersInput = "";
    this.showOptions = false;
  }
  $onChanges(changes) {
    if(changes.state){
      this.state = Object.assign({}, this.state);
    }
    if(changes.inputOptions){
      this.inputOptions = Object.assign({}, this.inputOptions);
    }
  }
  onSubmit(){
    const { usersInput } = this;
    let preparedURLs = {} || this.PrepareURLs.normalize(usersInput);
    this.usersInput = "";
    const $event = {
      $event: {
        data: preparedURLs
      }
    };
    this.getData(event);

  }
  passNewState(){
    const { state } = this;
    const $event = {
      $event: {
        state
      }
    };
    this.updateState($event);
  }
}
InputController.$inject = ["EventEmitter", "PrepareURLs"];
