const Discord = require("discord.js");
const colors = require('../../settings/colors.json');

module.exports.run = async (client, message, args) => {

    let helpMessage = new Discord.MessageEmbed()
        .setTitle("Moderation Assistant")
        .setURL("http://aristotelhs.me")
        .setColor(colors.blue)
        .setTimestamp(message.createdAt)
        .setFooter("Made by Aristotelhs#1406")
        .setDescription('> **``!ban [@user] [reason]``** - Ban the specified user.\n> **``!unban [@user] [reason]``** - Unban the specified user.\n> **``!kick [@user] [reason]``** - Kick the specified user.\n\n> **``!mute [@user] [length] [reason]``** - Mute the specified user.\n> **``!unmute [@user] [reason]``** - Unmute the specified user.\n\n> **``!warn [@user] [reason]``** - Warn the specified user.\n> **``!unwarn [@user] [id] [reason]``** - Unwarn the speicified user.\n> **``!warnings [@user]``** - See warnings speicified user.')

    return message.channel.send(helpMessage);
    
}

module.exports.help = {
    name: "help"
}