// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: '471f5249-54e9-4f28-b9c8-a84bce3d8b73', appPassword: 'jLvpTor0mwSdigQXhJvZmAr' }); 
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
/*
// Create bot dialogs
bot.dialog('/', function (session) {
    session.send("Hello World");
});
*/

// Variaveis do LUIS

var model = 'https://api.projectoxford.ai/luis/v2.0/apps/987147e7-41a0-4e0f-b290-f1846d2bf64c?subscription-key=a152b2b2c13b46518fceb82ca064b920&q=ol%C3%A1&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog); 

//dialog.matches('Saudacao', builder.DialogAction.send('Entendi que voce quer dizer ola'));

dialog.matches('Saudacao', [

    function (session, args, next) {

		session.beginDialog('/askName');

		//session.beginDialog('/ensureProfile', session.userData.profile);

    },

    function (session, results) {

        session.send('Ola %s!', results.response);

        session.send('Como posso te ajudar?');

    }

]);