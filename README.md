# Area
Area - EPITECH project. This project asks us to implement a software suite that functions similar to that of IFTTT and/or Zapier. This software suite will be broken into three parts : • An application server to implement all the features listed below (see Features) • A web client to use the application from your browser by querying the application server • A mobile client to use the application from your phone by querying the application server

# How to launch
Open terminal at root of the project
Use this command line :
[
docker-compose up --build
]
It will install all the requirement and launch both the server, webclient and mobile client.

# How to use - Webclient
Once the docker command launched, open a navigator and go to this URL :
[
https://localhost:8081
]
You'll be redirected to a login page where you can choose to register a new user account or to log in yours.

# How to use - Mobile Client
Once the docker command launched, open Android Studio and click on "Run"
You'll be redirected to a login page where you can choose to register a new user account or to log in yours.

# How it works - User Behaviour
Once connected on the client, you can define your own AREAs (Action-Reactions) to do so, simply click the ADD button on the main page.
Next, you can choose through and certain collection of ACTIONs from different services that will trigger a REACTION
Next, you'll be able to choose a REACTION and validate.

# How it works - Server Behaviour
Once you've set one or more AREAs onto your page, the server will indefintely check if one of the ACTIONs was triggered (see server/js/update.js)
Then, every time the ACTION will be triggered, which the server will check using API Calls summed up in "server/js/apiCalls.js", the server will automatically launch a REACTION 

# How it works - Actions and reaction behaviour
All the actions behaviour are checkable in "server/js/action.js"
All the reactions behaviour are checkable in "server/js/reaction.js"