const express = require('express');
const router = express.Router();
const ip = require("ip");


router.get('/', (req, res) => {
    let time = (new Date).getTime();
    res.json({
        "client": {
            "host": ip.address()
        },
        "server": {
            "current_time": time,
        },
        "services": [{
            "name": "facebook",
            "actions": [{
                "name": "new_post",
                "description": "New post on profile"
            }, {
                "name": "new_relationship",
                "description": "New relationship on profile"
            }]
        }, {
            "name": "github",
            "actions": [{
                "name": "new_following",
                "description": "User follows a new user"
            }, {
                "name": "new_follower",
                "description": "User has a new follower"
            }, {
                "name": "new_repo",
                "description": "User has a new repo"
            }, {
                "name": "new_stash",
                "description": "User has a new stash"
            }]
        }, {
            "name": "weather",
            "actions": [{
                "name": "new_temp",
                "description": "City has a new temp"
            }]
        }, {
            "name": "nasa",
            "actions": [{
                "name": "new_speed_rotation",
                "description": "Earth has a new speed rotation"
            }]
        }, {
            "name": "money",
            "actions": [{
                "name": "new_currency_rate",
                "description": "Money has a new currency rate"
            }]
        }, {
            "name": "youtube",
            "actions": [{
                "name": "new_views_count",
                "description": "Video has new views"
            }, {
                "name": "new_likes_count",
                "description": "Video has new likes"
            }, {
                "name": "new_dislikes_count",
                "description": "Video has new dislikes"
            }, {
                "name": "new_comments_count",
                "description": "Video has new comments"
            }]
        }, {
            "name": "reddit",
            "actions": [{
                "name": "new_post_subreddit",
                "description": "New post on a subreddit"
            }]
        }, {
            "name": "mail",
            "reactions": [{
                "name": "send_mail",
                "description": "Send an email to user email"
            }]
        }]
    });
});

module.exports = router;
