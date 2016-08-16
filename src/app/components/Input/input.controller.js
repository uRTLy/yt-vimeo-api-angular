import demoCollection from './demoCollection.js';

export default class InputController {
  constructor (HandleUsersInput) {
    this.handleUsersInput = HandleUsersInput;
    this.usersInput = '';
    this.showOptions = this.state.pages.length;
  }
  onSubmit (usersInput) {
    const IDs = this.handleUsersInput.getIDs(usersInput);
    this.usersInput = '';
    this.getData({ $event: IDs });
  }
  onLoadDemoCollection () {
    this.onSubmit(demoCollection.join(','));
  }
  onDeleteVideos () {
    this.updateState({ $event: { videos: [] } });
  }
}

InputController.$inject = ['HandleUsersInput'];
