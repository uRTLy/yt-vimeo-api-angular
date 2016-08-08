

export default class PrepareURLs {
  constructor() {
    this.youtubePattern = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[?=&+%\w-]*/ig;
    this.vimeoPattern = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
    this.isVimeo = this.isVimeo.bind(this);
    this.cutID = this.cutID.bind(this);
    this.sortedLinks = {};
  }
  normalize(input){
    const splitBy = (input.includes(",")) ? "," : "\n";
    const arrayOfUrls = input.split(splitBy);
    const { cutID } = this;
    arrayOfUrls.forEach(cutID);

    const preparedURLs = Object.assign({}, this.sortedLinks);
    this.sortedLinks = {};

    return preparedURLs;
  }
  isVimeo(link){
    return link.includes("vimeo.com");
  }
  cutID(link){
    const { vimeoPattern, youtubePattern, isVimeo} = this;
    const pattern = ( isVimeo(link) ) ? vimeoPattern : youtubePattern;
    const positionOfID = ( pattern === vimeoPattern) ? "$3" : "$1";
    const property = (positionOfID === "$3") ? "vimeo" : "youtube";

    const id = link.replace(pattern, positionOfID);

    if(!this.sortedLinks[`${property}`]){
      this.sortedLinks[`${property}`] = [];
    }
    this.sortedLinks[`${property}`].push(id);
  }
}
