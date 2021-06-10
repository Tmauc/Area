
//
// GESTION FACEBOOK 
//

var FB = require('fb').default;
const https = require('https');

function FacebookPost(widget, user, reaction)
{
    FB.api(
        `/${user.services.facebook.userId}/posts`,
        function (response) {
            if (response.error)
                return;
            const json = JSON.parse(response);
            if (json.data[0].id != user.services.facebook.lastPostId) {
                user.services.facebook.lastPostId = json.data[0].id;
                console.log("Info: reaction facebook post!");
                reaction(user, widget.data);
            }
        }
    );
}

function FacebookReloationshipChanged(widget, user, reaction)
{
    FB.api(
        `/${user.services.facebook.userId}/family`,
        function (response) {
            if (response.error)
                return;
            const json = JSON.parse(response);
            if (json.data[0].relationship != user.services.facebook.relationship) {
                user.services.facebook.relationship = json.data[0].relationship;
                console.log("Info: reaction facebook relationship!");
                reaction(user, widget.data);
            }
        }
    );
}

//
// FIN FACEBOOK 
//

//
// GESTION GITHUB 
//

function GithubRequestFollowing(widget, user, reaction)
{
    var options = { headers: { 'User-Agent': 'Awesome-Octocat-App' }};
    https.get('https://api.github.com/users/'+user.services.github.username, options, function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
            var obj = JSON.parse(data)
            if (obj.following == undefined) {
                console.error(`Error: github username not found for ${user.email}`)
                return
            }
            if (obj.following != user.services.github.following) {
                user.services.github.following = obj.following;
                user.save();
                console.log("Info: reaction github following!");
                reaction(user, widget.data);
            }
        });
    });
}

function GithubRequestRepos(widget, user, reaction)
{
    var options = { headers: { 'User-Agent': 'Awesome-Octocat-App' }};
    https.get('https://api.github.com/users/'+user.services.github.username, options, function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
            var obj = JSON.parse(data)
            if (obj.public_repos == undefined) {
                console.error(`Error: github username not found for ${user.email}`)
                return
            }
            if (obj.public_repos != user.services.github.public_repos) {
                user.services.github.public_repos = obj.public_repos;
                user.save();
                console.log("Info: reaction github repos!");
                reaction(user, widget.data);
            }
        });
    });
}

function GithubRequestStash(widget, user, reaction)
{
    var options = { headers: { 'User-Agent': 'Awesome-Octocat-App' }};
    https.get('https://api.github.com/users/'+user.services.github.username, options, function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
            var obj = JSON.parse(data)
            if (obj.public_gists == undefined) {
                console.error(`Error: github username not found for ${user.email}`)
                return
            }
            if (obj.public_gists != user.services.github.public_gists) {
                user.services.github.public_gists = obj.public_gists;
                user.save();
                console.log("Info: reaction github stash!");
                reaction(user, widget.data);
            }
        });
    });
}

function GithubRequestFollowers(widget, user, reaction)
{
    var options = { headers: { 'User-Agent': 'Awesome-Octocat-App' }};
    https.get('https://api.github.com/users/'+user.services.github.username, options, function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
            var obj = JSON.parse(data)
            if (obj.followers == undefined) {
                console.error(`Error: github username not found for ${user.email}`)
                return
            }
            if (obj.followers != user.services.github.followers) {
                user.services.github.followers = obj.followers;
                user.save();
                console.log("Info: reaction github followers!");
                reaction(user, widget.data);
            }
        });
    });
}

//
// FIN GITHUB 
//

//
// GESTION WHEATHER 
//

function WeatherTemperatureChanged(widget, user, reaction)
{
    if (widget.data.city == undefined) {
        console.log("Error: city data undefined")
        return
    }
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+ widget.data.city +",fr&appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric", function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
            var found = false

            for (let index = 0; index < user.services.weather.length; index++) {
                if (user.services.weather[index].city == widget.data.city) {
                    found = true
                    if (JSON.parse(data).main.temp != user.services.weather[index].temperature) {
                        user.services.weather[index].temperature = JSON.parse(data).main.temp
                        console.log("Info: reaction weather temp!");
                        reaction(user, widget.data)
                        user.save()
                    }
                }
            }
            if (found == false) {
                console.log("New: added new weather city");
                user.services.weather.push({city: widget.data.city, temperature: JSON.parse(data).main.temp});
                user.save()
            }
        });
    });
}

//
// FIN WHEATHER 
//

//
// GESTION NASA 
//

function NasaGestionSpeed(widget, user, reaction)
{
    https.get("https://api.nasa.gov/DONKI/CMEAnalysis?startDate=2016-09-01&endDate=2016-09-30&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=xTxbMKwzjp5wy3Za9vYRpkGbrQzA7dxiDaaVmbNw", function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
    
        res.on('end', () => {
            let obj = JSON.parse(data);
            if (user.services.nasa.speed != obj[0].speed) {
                user.services.nasa.speed = obj[0].speed
                user.save()
                console.log("Info: reaction nasa speed!");
                reaction(user, widget.data)
            }
        });
    });
}

//
// FIN NASA 
//

//
// GESTION MONEY CONVERT 
//

function convertCurrency(widget, user, reaction)
{
    var url = 'https://api.exchangeratesapi.io/latest'
    https.get(url, function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
            let obj = JSON.parse(data);
            let currency = obj.rates[JSON.parse(widget.data).money]
            var found = false

            for (let index = 0; index < user.services.money.length; index++) {
                if (user.services.money[index].name == JSON.parse(widget.data).money) {
                    found = true
                    if (user.services.money[index].value != currency) {
                        user.services.money[index].value = currency
                        console.log("Info: reaction money currency!");
                        reaction(user, widget.data)
                        user.save()
                    }
                }
            }
            if (found == false) {
                console.log("New: added new currency");
                user.services.money.push({name: JSON.parse(widget.data).money, value: currency});
                user.save()
            }
        });
    });
}

//
// FIN MONEY CONVERT 
//

//
// GESTION youtube
//

const getYoutubeVideoId = require("./apiCalls").getYoutubeVideoId

function youtubeRequestViews(widget, user, reaction) {
    var idvideo = getYoutubeVideoId(widget.data.video)

    var url = "https://www.googleapis.com/youtube/v3/videos?id="+ idvideo +"&key=AIzaSyDZaXymOv1a-3zMrxCeId6LSRLb9Hz7f4w&part=snippet,contentDetails,statistics,status"
    https.get(url, function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
            let stats = JSON.parse(data).items[0].statistics
            var found = false

            for (let index = 0; index < user.services.youtube.length; index++) {
                if (user.services.youtube[index].id == idvideo) {
                    found = true
                    if (user.services.youtube[index].views != stats.viewCount) {
                        user.services.youtube[index].views = stats.viewCount
                        console.log("Info: reaction youtube views!");
                        reaction(user, widget.data)
                        user.save()
                    }
                }
            }
            if (found == false) {
                console.log("New: added new youtube views");
                user.services.youtube.push({id: idvideo, views: stats.viewCount, likes: stats.likeCount, dislikes: stats.dislikeCount, comments: stats.commentCount});
                user.save()
            }
        });
    });
}

function youtubeRequestLikes(widget, user, reaction) {
    var idvideo = getYoutubeVideoId(widget.data.video)

    var url = "https://www.googleapis.com/youtube/v3/videos?id="+ idvideo +"&key=AIzaSyDZaXymOv1a-3zMrxCeId6LSRLb9Hz7f4w&part=snippet,contentDetails,statistics,status"
    https.get(url, function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
            let stats = JSON.parse(data).items[0].statistics
            var found = false

            for (let index = 0; index < user.services.youtube.length; index++) {
                if (user.services.youtube[index].id == idvideo) {
                    found = true
                    if (user.services.youtube[index].likes != stats.likeCount) {
                        user.services.youtube[index].likes = stats.likeCount
                        console.log("Info: reaction youtube likes!");
                        reaction(user, widget.data)
                        user.save()
                    }
                }
            }
            if (found == false) {
                console.log("New: added new youtube likes");
                user.services.youtube.push({id: idvideo, views: stats.viewCount, likes: stats.likeCount, dislikes: stats.dislikeCount, comments: stats.commentCount});
                user.save()
            }
        });
    });
}

function youtubeRequestDislikes(widget, user, reaction) {
    var idvideo = getYoutubeVideoId(widget.data.video)

    var url = "https://www.googleapis.com/youtube/v3/videos?id="+ idvideo +"&key=AIzaSyDZaXymOv1a-3zMrxCeId6LSRLb9Hz7f4w&part=snippet,contentDetails,statistics,status"
    https.get(url, function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
            let stats = JSON.parse(data).items[0].statistics
            var found = false

            for (let index = 0; index < user.services.youtube.length; index++) {
                if (user.services.youtube[index].id == idvideo) {
                    found = true
                    if (user.services.youtube[index].dislikes != stats.dislikeCount) {
                        user.services.youtube[index].dislikes = stats.dislikeCount
                        console.log("Info: reaction youtube dislikes!");
                        reaction(user, widget.data)
                        user.save()
                    }
                }
            }
            if (found == false) {
                console.log("New: added new youtube dislikes");
                user.services.youtube.push({id: idvideo, views: stats.viewCount, likes: stats.likeCount, dislikes: stats.dislikeCount, comments: stats.commentCount});
                user.save()
            }
        });
    });
}

function youtubeRequestComments(widget, user, reaction) {
    var idvideo = getYoutubeVideoId(widget.data.video)

    var url = "https://www.googleapis.com/youtube/v3/videos?id="+ idvideo +"&key=AIzaSyDZaXymOv1a-3zMrxCeId6LSRLb9Hz7f4w&part=snippet,contentDetails,statistics,status"
    https.get(url, function(res) {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
            let stats = JSON.parse(data).items[0].statistics
            var found = false

            for (let index = 0; index < user.services.youtube.length; index++) {
                if (user.services.youtube[index].id == idvideo) {
                    found = true
                    if (user.services.youtube[index].comments != stats.commentCount) {
                        user.services.youtube[index].comments = stats.commentCount
                        console.log("Info: reaction youtube comments!");
                        reaction(user, widget.data)
                        user.save()
                    }
                }
            }
            if (found == false) {
                console.log("New: added new youtube comments");
                user.services.youtube.push({id: idvideo, views: stats.viewCount, likes: stats.likeCount, dislikes: stats.dislikeCount, comments: stats.commentCount});
                user.save()
            }
        });
    });
}

//
// FIN youtube
//

//
// GESTION reddit
//

const getSubredditLastPostId = require("./apiCalls").getSubredditLastPostId;
function RedditNewPost(widget, user, reaction)
{
    const url = getSubredditLastPostId(widget.data.name)

    user.services.reddit.forEach(reddit => {
        if (reddit.subreddit == widget.data.name) {
            if (reddit.lastpost != url) {
                reddit.lastpost = url;
                console.log("reaction reddit post sub!");
                reaction(user, widget.data)
            }
        }
    });
}

//
// FIN reddit
//

const ActionEnum = {
    "facebook_post": 0, "facebook_relationship_changed": 1,
    "weather_temperature": 2,
    "money_value": 3,
    "youtube_like": 4, "youtube_dislike": 5, "youtube_views": 6, "youtube_comments": 7,
    "reddit_new_post": 8,
    "github_new_follower": 9, "github_new_following": 10, "github_request_repos": 11, "github_request_stash": 12,
    "nasa_new_speed": 13
};


let ActionFunction = [
    FacebookPost, FacebookReloationshipChanged,
    WeatherTemperatureChanged,
    convertCurrency,
    youtubeRequestViews, youtubeRequestDislikes, youtubeRequestLikes, youtubeRequestComments,
    RedditNewPost,
    GithubRequestFollowers, GithubRequestFollowing, GithubRequestRepos, GithubRequestStash,
    NasaGestionSpeed
];

module.exports = { ActionEnum, ActionFunction };
