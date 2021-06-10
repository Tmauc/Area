const User = require('../models/userModel');
const ActionFunction = require('./actions').ActionFunction;
const ReactionFunction = require('./reactions').ReactionFunction;

function update_user(user)
{
    user.widgets.forEach(widget => {
        console.log("update_user: ", user.email, widget.action, widget.reaction);
        ActionFunction[widget.action](widget, user, ReactionFunction[widget.reaction]);
    });
}

function update()
{
    User.find({}, function(err, users) {
        users.forEach(user => {
            update_user(user);
        });
    });
}

module.exports = update;