

export default class FetchData {
  constructor($http,$q){
    this.vimeoURL = "http://vimeo.com/api/v2/video/";
    this.youtubeKEY = "AIzaSyBDV-uheLaZTbyCLTMZ4SO1RhcaM1cMYX4";
    this.youtubeURL = "https://www.googleapis.com/youtube/v3/videos?id=";
    this.youtubeEndOfURL = `&part=snippet,statistics&key=${this.youtubeKEY}`;
    this.$http = $http;
    this.$q =  $q;
    this.handleData = this.handleData.bind(this);
  }
  setApisAndURLs(vimeoURL, youtubeURL, ytApi, vimeoAPI ){}
  fetch(data) {
    const { $http, $q, vimeoURL, youtubeURL, youtubeEndOfURL, handleData } = this;
    const {youtube, vimeo } = data;

    let promises = [];

    if(vimeo){
      vimeo.forEach(id => {
        promises.push($http.get(vimeoURL + id + ".json"));
      });
    }

    if(youtube){
      const IDs = youtube.join(",");
      promises.push($http.get(youtubeURL + IDs + youtubeEndOfURL));
    }
    return $q.all(promises).then(handleData);

  }
  handleVimeo(video){

    const { duration, stats_number_of_comments,
    stats_number_of_plays ,stats_number_of_likes,
    user_name, title, thumbnail_large, id } = video;
    return  {
      title,
      user: user_name,
      url: "http://player.vimeo.com/video/" + id,
      comments: stats_number_of_comments,
      likes: stats_number_of_likes,
      views: stats_number_of_plays,
      thumbnail: thumbnail_large,
      favourite: false,
      date: Date.now()
    };

  }
  handleYoutube(videos){
    const videosReadyToDisplay = videos.map( video => {
      const { title, description, channelTitle, thumbnails  } = video.snippet;
      const { commentCount, likeCount, viewCount } = video.statistics;
      const { id } = video;
      return  {
        title,
        user: channelTitle,
        url: "https://www.youtube.com/embed/" + id ,
        comments: commentCount,
        likes: likeCount,
        views: viewCount,
        thumbnail: thumbnails.high.url,
        favourite: false,
        date: Date.now()
      };

    });
    return videosReadyToDisplay;
  }
  handleData(res, err) {
    let yt = [];
    const videos = res.map( video => {
      if(video.config.url.includes("googleapis")){
        yt = this.handleYoutube(video.data.items);
        return;
      }
      return this.handleVimeo(video.data[0]);
    });

    return videos.concat(yt).filter( value => !!value );
  }
}
FetchData.$inject = ["$http", "$q"];
