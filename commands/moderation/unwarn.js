const warnModel = require('../../models/warn');
const Discord = require('discord.js');
const colors = require('../../settings/colors.json');

module.exports.run = async (client, message, args) => {

    const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

    if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You don\'t have permission to unwarn members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!mentionedMember) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You need to mention a member you want to unwarn.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const mentionedPotision = mentionedMember.roles.highest.position
    const memberPotision = message.member.roles.highest.position

    if (memberPotision <= mentionedPotision) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You can\'t unwarn this member as there role is higher to yours.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const reason = args.slice(2).join(' ') || 'Not Specified'

    const warnDoc = await warnModel.findOne({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
    }).catch(err => console.log(err))

    if (!warnDoc || !warnDoc.warnings.length) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** This member dosn\'t have any warnings.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const warningID = parseInt(args[1])

    if (warningID <= 0 || warningID > warnDoc.warnings.length) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** This is an invalid warning id.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    warnDoc.warnings.splice(warningID - 1, warningID !== 1 ? warningID - 1 : 1)

    await warnDoc.save().catch(err => console.log(err))

    message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .addField("**Memeber**", `${mentionedMember}`)
        .addField("**Action**", "Unwarn")
        .addField("**Reason**", `${reason ? `${reason}` : ''}`)
        .setTimestamp(message.createdAt)
        .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter("Made by Aristotelhs#1406")
        .setColor(colors.unwarn))

}

module.exports.help = {
    name: "unwarn"
}

