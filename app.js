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
// Após o primeiro input do usuário, será exibida a mensagem 'Olá! Me diga o seu nome.'
bot.dialog('/', [
    function(session) {
        builder.Prompts.text(session, 'Olá! Me diga o seu nome.');
    },
    // Após responder com o nome, a mensagem 'Seja bem vindo Nome' será exibida.
    function(session, results) {
        session.send('Seja bem vindo %s!', results.response);
    }

]);

