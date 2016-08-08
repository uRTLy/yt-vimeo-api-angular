

export default class CookiesService {
  constructor(){
    console.log(window.localStorage);
  }
  updateStorage(state){
    window.localStorage.setItem("state", JSON.stringify(state));
  }
  retrieveFromStorage(){
    return JSON.parse(window.localStorage.getItem("state"));
  }
}
