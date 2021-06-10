# 0. AREA | Action Reaction | Epitech Project

# 1. HOW TO LAUNCH

Open terminal at root of the project
Use this command line :
[
docker-compose up --build
]
It will install all the requirement and launch both the server, webclient and mobile client.

# 2.HOW TO USE

# 2.1 WEBCLIENT

Once the docker command launched, open a navigator and go to this URL :
[
https://localhost:8081
]
You'll be redirected to a login page where you can choose to register a new user account or to log in yours.

# 2.2 MOBILE CLIENT

Once the docker command launched, open Android Studio and click on "Run"
You'll be redirected to a login page where you can choose to register a new user account or to log in yours.

# 3. HOW IT WORKS

# 3.1 USER BEHAVIOUR

Once connected on the client, you can define your own AREAs (Action-Reactions) to do so, simply click the ADD button on the main page.
Next, you can choose through and certain collection of ACTIONs from different services that will trigger a REACTION
Next, you'll be able to choose a REACTION and validate.

# 3.2 SERVER BEHAVIOUR

Once you've set one or more AREAs onto your page, the server will indefintely check if one of the ACTIONs was triggered (see server/js/update.js)
Then, every time the ACTION will be triggered, which the server will check using API Calls summed up in "server/js/apiCalls.js", the server will automatically launch a REACTION 

# 3.2.1 ACTIONS AND REACTION BEHAVIOUR

All the actions behaviour are checkable in "server/js/action.js"
All the reactions behaviour are checkable in "server/js/reaction.js"