const mongoose = require('mongoose');
const ActionEnum = require('../js/actions').ActionEnum;
const ReactionEnum = require('../js/reactions').ReactionEnum;

const userSchema = mongoose.Schema({
    name: {type: String, default: ""},
    lastname: {type: String, default: ""},
    email: {type: String, default: ""},
    password: {type: String, default: ""},
    photoUrl: {type: String, default: ""},
    services: {
        facebook: {
            accessToken: {type: String, default: ""},
            userId: {type: String, default: ""},
            lastPostId: {type: String, default: ""},
            relationship: {type: String, default: ""}
        },
        github: {
            username: {type: String, default: ""},
            public_repos: {type: Number, default: 0},
            public_gists: {type: Number, default: 0},
            followers: {type: Number, default: 0},
            following: {type: Number, default: 0}
        },
        weather: [{
            city: {type: String, default: ""},
            temperature: {type: Number, default: 0}
        }],
        money: [{
            name: {type: String, default: ""},
            value: {type: Number, default: 0}
        }],
        reddit: [{
            subreddit: {type: String, default: ""},
            lastpost: {type: String, default: ""}
        }],
        nasa: {
            speed: {type: Number, default: 0}
        },
        youtube: [{
            id: {type: String, default: ""},
            views: {type: Number, default: 0},
            likes: {type: Number, default: 0},
            dislikes: {type: Number, default: 0},
            comments: {type: Number, default: 0}
        }]
    },
    widgets: [{
        action: { type: ActionEnum, require: true},
        reaction: { type: ReactionEnum, require: true},
        data: { type: Object }
      }]
});

userSchema.methods.addWidget = function(action, reaction, data) {
    const newWidget = {
      action: action,
      reaction: reaction,
      data: data
    };
    this.widgets.push(newWidget);
    this.save()
  };

module.exports = mongoose.model('User', userSchema);
