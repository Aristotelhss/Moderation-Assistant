const userReg = RegExp(/<@!?(\d+)>/);
const Discord = require('discord.js');
const colors = require('../../settings/colors.json');

module.exports.run = async (client, message, args) => {

    const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0]
    const mentionedUser = await message.client.users.fetch(userID).catch(() => null)

    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You don\'t have permission to unban members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** I don\'t have permission to unban members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!mentionedUser) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You need to mention a user to unban.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const allBans = await message.guild.fetchBans()
    const bannedUser = allBans.get(mentionedUser.id)

    if (!bannedUser) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** This member is not banned.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const reason = args.slice(1).join(' ') || 'Not Specified'

    message.guild.members.unban(mentionedUser.id, [reason]).catch(err => console.log(err))

    message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .addField("**Memeber**", `${mentionedUser}`)
        .addField("**Action**", "Unban")
        .addField("**Reason**", `${reason ? `${reason}` : ''}`)
        .setThumbnail(mentionedUser.displayAvatarURL({ dynamic: true }))
        .setTimestamp(message.createdAt)
        .setFooter("Made by Aristotelhs#1406")
        .setColor(colors.unban))

}

module.exports.help = {
    name: "unban"
}