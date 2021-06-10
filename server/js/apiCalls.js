/*Github Part*/

/*const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
    userAgent: 'AreaEpitechLyon2020',
    baseUrl: 'https://api.github.com',
});

//To get info like followers, the response is : resp.data.followers
async function getGithubUserGeneralInfo(username) {
    return (octokit.users.getByUsername({username}));
}*/

//Get city weather info, description and temp : data = JSON.parse(body.body)
//description = data.weather[0].description
//temp = data.main.temp
async function getCityWeatherInfo(city) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2e3273b9fe5c2cb7870fbfa386c7cbee`;
    const request = require('request-promise');

    return request(url);
}

//Get movie info, popularity and vote_average: data = JSON.parse(body), vote_average = data.results[0].vote_average
async function getMovieInfo(movie) {
    let url = 'https://api.themoviedb.org/3/search/movie?api_key=8943a8d22d6a57cbd56344247b60640c&query=' + movie;
    const request = require('request-promise');

    return request(url);
}

//Get youtube video info, viewCount and likeCount and dislikeCount and commentCount: data = JSON.parse(body)
//viewCount = data.items[0].statistics.viewCount
async function getYoutubeVideoInfo(videoId) {
    const url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + videoId + '&key=AIzaSyCgIW1fKR3UCyHmXqq10Zfw9zH-ktvtE4w';
    const request = require('request-promise');

    return request(url);
}

function getSubredditLastPostId(subreddit) {
    $.get(`https://www.reddit.com/${subreddit}/hot/.json?limit=1&restrict_sr=1`, function(json, status) {
      return (json.data.children[json.data.children.length - 1].data.url);
    });
}

function getYoutubeVideoId(MUSIC) {
    var idvideo = "_Yhyp-_hX2s"
    if (MUSIC == "sneazy")
        idvideo = "0j5yI5TKHI0"
    else if (MUSIC == "RihannaDiamonds")
        idvideo = "lWA2pjMjpBs"
    else if (MUSIC == "DavidGuettaTitanium")
        idvideo = "JRfuAukYTKg"
    else if (MUSIC == "PartyRockAnthems")
        idvideo = "KQ6zr6kCPj8"
    else if (MUSIC == "oldTownRoad")
        idvideo = "r7qovpFAGrQ"
    else if (MUSIC == "HappierMarshmallow")
        idvideo = "m7Bc3pLyij0"
    else if (MUSIC == "AngeleOuiOuNon")
        idvideo = "XqAiGeEzctQ"
    else if (MUSIC == "NekfeuOnVerra")
        idvideo = "YltjliK0ZeA"
    else if (MUSIC == "OrelsanAlheureOu")
        idvideo = "1b0Eh4iELqQ"
    else if (MUSIC == "MaitreGimsJemeTire")
        idvideo = "Ugx3WssTeL8"
    else if (MUSIC == "ToxicBritney")
        idvideo = "LOZuxwVk7TU"
    else if (MUSIC == "Macklemore")
        idvideo = "QK8mJJJvaes"
    else if (MUSIC == "EminemLoseYourself")
        idvideo = "_Yhyp-_hX2s"
    return idvideo
}

module.exports = { getCityWeatherInfo, getMovieInfo, getYoutubeVideoInfo, getSubredditLastPostId, getYoutubeVideoId};

