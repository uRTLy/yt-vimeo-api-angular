
export default class AppController {
  constructor (FetchData, LocalStorage, Pagination) {
    this.fetchData = FetchData;
    this.localStorage = LocalStorage;
    this.pagination = Pagination;
  }
  $onInit () {
    const orderByOptions = [{
      option: 'All',
      value: 'all'
    }, {
      option: 'Recently Added',
      value: 'newest'
    }, {
      option: 'Oldest',
      value: 'oldest'
    }];
    const itemsPerPageOptions = [6, 12, 24, 50, 100];

    const defaultState = {
      videos: [],
      pageNumber: 0,
      listView: false,
      itemsPerPage: 5,
      showFavourite: false,
      orderBy: orderByOptions[0].value,
      itemsPerPageOptions,
      orderByOptions,
      pages: []
    };

    this.state = this.localStorage.retrieveFromStorage() || defaultState;
  }
  getData (IDs) {
    this.fetchData.fetch(IDs).then(fetchedVideos => {
      const videos = this.state.videos.concat(fetchedVideos);
      this.updateState({ videos });
    });
  }
  updateState (newState) {
    this.state = Object.assign({}, this.state, newState);
    this.localStorage.updateStorage(this.state);
  }
  updateAvailablePages ({ pages, correctPageNumber }) {
    this.state.pages = pages;
    this.state.pageNumber = correctPageNumber;
  }
}
AppController.$inject = ['FetchData', 'LocalStorage', 'Pagination'];
