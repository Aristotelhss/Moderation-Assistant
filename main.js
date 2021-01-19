const Discord = require("discord.js");
const secret = require("./settings/secret.json");
const client = new Discord.Client({disableEveryone: true});

client.commands = new Discord.Collection();

const lib = require("./lib/functions");
lib.setup(client);

module.exports.client = client;

client.login(secret.token);