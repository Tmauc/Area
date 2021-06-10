const axios = require('axios')

function FacebookPostMessage(user, data)
{
    return
    if (data.message == undefined)
    axios.post(`https://graph.facebook.com/${user.services.facebook.userId}/feed`, {
        message: data.message,
        access_token: user.services.facebook.accessToken
    })
    .then((res) => {
        console.log(`POST FACEBOOK OK statusCode: ${res.statusCode}`)
    })
    .catch((error) => {
        console.error("ERROR ON REQUEST FACEBOOK POST MESSAGE")
    })
}

function FacebookPostLink(user, data)
{
    return
    axios.post(`https://graph.facebook.com/${user.services.facebook.userId}/feed`, {
        message: data.message,
        access_token: user.services.facebook.accessToken,
        link: data.link
    })
    .then((res) => {
        console.log(`LINK POST FACEBOOK OK statusCode: ${res.statusCode}`)
    })
    .catch((error) => {
        console.error("ERROR ON REQUEST FACEBOOK POST LINK")
    })
}

// GESTION ENVOIE DE MAIL

var nodemailer = require('nodemailer');

function sendMail(user, data)
{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jeremaxarea@gmail.com',
        pass: 'epitech123'
      }
    });

    var mailOptions = {
      from: 'jeremaxarea@gmail.com',
      to: user.email,
      subject: 'Area mail !',
      text: 'Reaction area mail!'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("Error: ", error);
      } else {
        console.log(`Email sent to : ${user.email}: [${info.response}]`);
      }
    });

}

// GESTION ENVOIE DE MAIL

const ReactionEnum = {
    "sendMail": 0
};

var ReactionFunction = [ sendMail ];

module.exports = { ReactionEnum, ReactionFunction };