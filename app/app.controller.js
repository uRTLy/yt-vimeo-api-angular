import angular from "angular";
import  demoCollection  from "./demoCollection.js";


export default class AppController {
  constructor( EventEmitter, FetchData, PrepareURLs, CookiesService) {
    this.FetchData = FetchData;
    this.prepareURLs = PrepareURLs;
    this.demoUrls = this.prepareURLs.normalize(demoCollection.join(","));
    this.CookiesService =  CookiesService;
  }
  $onInit() {
    const orderByOptions = [
      { option: "All", value: "all"},
      { option: "Recently Added", value: "newest"},
      { option: "Oldest", value: "oldest"}
    ];
    const itemsPerPageOptions = [6, 12, 24, 50, 100];

    const defaultState = {
      videos: [],
      pageNumber: 0,
      listView: false,
      itemsPerPage: 5,
      showFavourite: false,
      orderBy: orderByOptions[0].value
    };

    this.inputOptions = {
      itemsPerPageOptions,
      orderByOptions,
      pages: []
    };

    this.state = this.CookiesService.retrieveFromStorage() || defaultState;

    console.log( this.state);
    console.log(this.CookiesService.retrieveFromStorage());


  }
  updateState($event){
    this.state = Object.assign({}, this.state, $event.state || $event);
    console.log(this.state);
    this.CookiesService.updateStorage(this.state);
  }
  getDataAndPass($event = this.demoUrls){
    this.FetchData.fetch($event.data || $event).then( videos => {
      this.state.videos = this.state.videos.concat(videos);
      this.state = Object.assign({}, this.state);
      this.CookiesService.updateStorage(this.state);
    });
  }
  updatePages($event){
    this.inputOptions = Object.assign({}, this.inputOptions , $event);
  }
  removeVideos(){
    this.state = Object.assign({}, this.state, {videos: []});
    this.CookiesService.updateStorage(this.state);
  }
}


AppController.$inject = ["EventEmitter", "FetchData", "PrepareURLs", "CookiesService"];
