

export default class FetchData {
  constructor ($http, $q) {
    this.vimeoURL = 'http://vimeo.com/api/v2/video/';
    this.youtubeKEY = 'AIzaSyBDV-uheLaZTbyCLTMZ4SO1RhcaM1cMYX4';
    this.youtubeURL = 'https://www.googleapis.com/youtube/v3/videos?id=';
    this.youtubeEndOfURL = `&part=snippet,statistics&key=${this.youtubeKEY}`;
    this.$http = $http;
    this.$q = $q;
    this.handleData = this.handleData.bind(this);
  }
  fetch (data) {
    const { $http, $q, vimeoURL, youtubeURL, youtubeEndOfURL, handleData } = this;
    let promises = [];

    data.forEach(video => {
      if (video.vimeo) {
        return promises.push($http.get(vimeoURL + video.id + '.json'));
      }
      return promises.push($http.get(youtubeURL + video.id + youtubeEndOfURL));
    });

    return $q.all(promises).then(handleData);

  }
  handleData (res) {
    const videos = res.map(video => {
      if (video.config.url.includes('googleapis')) {
        return this.handleYoutube(video.data.items)[0];
      }
      return this.handleVimeo(video.data[0]);
    });

    return videos.filter(value => !!value);
  }
  handleVimeo (video) {

    const { stats_number_of_comments,
    stats_number_of_plays, stats_number_of_likes,
    user_name, title, thumbnail_large, id } = video;
    return  {
      title,
      user: user_name,
      url: 'http://player.vimeo.com/video/' + id,
      comments: stats_number_of_comments,
      likes: stats_number_of_likes,
      views: stats_number_of_plays,
      thumbnail: thumbnail_large,
      favourite: false,
      date: Date.now()
    };

  }
  handleYoutube (videos) {
    const videosReadyToDisplay = videos.map(video => {
      const { title, channelTitle, thumbnails  } = video.snippet;
      const { commentCount, likeCount, viewCount } = video.statistics;
      const { id } = video;
      return  {
        title,
        user: channelTitle,
        url: 'https://www.youtube.com/embed/' + id,
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
}
FetchData.$inject = ['$http', '$q'];
