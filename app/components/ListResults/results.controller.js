import angular from "angular";


export default class ResultsController {
  constructor(PaginationService, $mdDialog){
    this.PaginationService = PaginationService;
    this.previousPageNumber = 1;
    this.$mdDialog = $mdDialog;
  }
  $doCheck() {
    const { previousPageNumber,  state} = this;
    const { pageNumber } = state;

    if(previousPageNumber !== pageNumber){
      this.previousPageNumber = pageNumber;
      this.changePageNumber();
    }
  }
  $onChanges(changes){
    if(changes.state){
      this.state = Object.assign({}, this.state);
      this.onVideosArrival();
    }
  }
  onVideosArrival(){
    const { itemsPerPage, pageNumber} = this.state;

    const videos  = this.addActiveFilters(this.state, this.orderBy);
    const { pages, splittedToPages } = this.PaginationService.setConfig(videos, itemsPerPage).splitToPages();

    const pageNumberToSet = (pageNumber) ? this.isPageNumberAvailable(pageNumber, pages) : 0;
    this.videos = splittedToPages;
    this.videosToDisplay = this.videos[pageNumberToSet];
    this.updateNumberOfPages(pages);

  }
  changePageNumber(){
    const { videos , state} = this;

    this.videosToDisplay = videos[state.pageNumber];
  }
  addActiveFilters(state, orderFn){
    if(state.showFavourite){
      const favouriteVideos = this.state.videos.filter(video => video.favourite);

      return orderFn(state.orderBy, favouriteVideos);
    }
    return orderFn(state.orderBy, state.videos);
  }
  orderBy(order, videos){
    if(order === "all"){
      return videos;
    }
    const compareFunction = (order === "newest") ? (a, b) => a.date - b.date  :  (a, b) => b.date - a.date ;

    return videos.sort(compareFunction);
  }
  isPageNumberAvailable(actualPageNumber, pages){
    const highestPageNumberPossible = pages.some( pageNumber => pageNumber >= actualPageNumber );

    if(!highestPageNumberPossible){
      return Math.max(...pages);
    }
    return actualPageNumber;
  }
  updateNumberOfPages(pages){
    const $event = {
      $event: {
        pages
      }
    };
    this.updatePages($event);
  }
  onClickDeleteVideo(videoToRemove){
    const videos = this.state.videos.filter(video => video !== videoToRemove);
    const $event = {
      $event: {
        videos
      }
    };
    this.updateState($event);
  }
  onClickPlayVideo(url){

    this.$mdDialog.show({
      template: `
      <md-dialog>
        <md-dialog-content>

          <iframe ng-src="${url}" scrolling="no" style=" width: 700px; height: 460px;  overflow: hidden;" frameborder="0" allowfullscreen></iframe>

        </md-dialog-content>
      </md-dialog>`,
      parent: angular.element(document.body),
      escapeToClose: true,
      clickOutsideToClose:true,
      fullscreen: true
    });
  }
}

ResultsController.$inject = ["PaginationService", "$mdDialog"];
