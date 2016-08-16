import angular from 'angular';

export default class ResultsController {
  constructor (Pagination, $mdDialog, $document) {
    this.pagination = Pagination;
    this.$mdDialog = $mdDialog;
    this.$document = $document;
    this.previousPageNumber = 0;
  }
  $doCheck () {
    if (this.previousPageNumber !== this.state.pageNumber) {
      this.previousPageNumber = this.state.pageNumber;
      this.changePageNumber();
    }
  }
  $onChanges (changes) {
    if (changes.state) {
      this.state = Object.assign({}, this.state);
      this.onNewStateArrival(this.state);
    }
  }
  onNewStateArrival (state) {
    if(!state.videos.length) { return; }

    const { videos, itemsPerPage, pageNumber } = state;
    const videosSorted = this.sortVideos(videos);
    const { pages, splittedToPages } = this.pagination.setConfig(videosSorted, itemsPerPage).splitToPages();

    this.videosForPaging = splittedToPages;
    const correctPageNumber = this.pickHighestPageNumberIfActualExceeds(pages, pageNumber);

    this.updateAvailablePages({ $event: { pages, correctPageNumber } });
    this.videosToDisplay = splittedToPages[correctPageNumber];
  }
  pickHighestPageNumberIfActualExceeds (pages, pageNumber) {
    if (pages.includes(pageNumber)) {
      return pageNumber;
    }
    return Math.max(...pages);
  }
  changePageNumber () {
    this.videosToDisplay = this.videosForPaging[this.state.pageNumber];
  }
  sortVideos (videos) {
    const { showFavourite, orderBy} = this.state;
    let videosToSort = videos;

    if (showFavourite) {
      videosToSort = videosToSort.filter(video => video.favourite);
    }

    if (orderBy !== 'all') {
      const compareFunction = (orderBy === 'newest') ? (a, b) => a.date - b.date : (a, b) => b.date - a.date ;
      return videosToSort.sort(compareFunction);
    }
    return videosToSort;
  }
  onClickDeleteVideo (videoToRemove) {
    const videos = this.state.videos.filter(video => video !== videoToRemove);
    this.updateState({ $event: { videos } });
  }
  onClickPlayVideo (url) {
    this.$mdDialog.show({
      template: `
      <md-dialog>
        <md-dialog-content>
          <iframe ng-src='${url}' scrolling='no' style=' width: 700px; height: 460px;  overflow: hidden;' frameborder='0' allowfullscreen></iframe>
        </md-dialog-content>
      </md-dialog>`,
      parent: angular.element(this.$document.body),
      escapeToClose: true,
      clickOutsideToClose:true,
      fullscreen: true
    });
  }
}

ResultsController.$inject = ['Pagination', '$mdDialog', '$document'];
