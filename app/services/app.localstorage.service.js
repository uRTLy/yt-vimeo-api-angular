

export default class LocalStorage {
  constructor(){}
  updateStorage(state){
    window.localStorage.setItem("state", JSON.stringify(state));
  }
  retrieveFromStorage(){
    return JSON.parse(window.localStorage.getItem("state"));
  }
}
