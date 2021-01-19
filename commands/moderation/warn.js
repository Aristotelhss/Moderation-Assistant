const warnModel = require('../../models/warn');
const Discord = require('discord.js');
const colors = require('../../settings/colors.json');

module.exports.run = async (client, message, args) => {

    const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

    if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You don\'t have permission to warn members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!mentionedMember) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You need to mention a member you want to warn.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const mentionedPotision = mentionedMember.roles.highest.position
    const memberPotision = message.member.roles.highest.position

    if (memberPotision <= mentionedPotision) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You can\'t warn this member as their role is higher to yours.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const reason = args.slice(1).join(' ') || 'Not Specified'

    let warnDoc = await warnModel.findOne({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
    }).catch(err => console.log(err))

    if (!warnDoc) {
        warnDoc = new warnModel({
            guildID: message.guild.id,
            memberID: mentionedMember.id,
            warnings: [reason],
            moderator: [message.member.id],
            date: [Date.now()],
        })

        await warnDoc.save().catch(err => console.log(err))
    }
    else {
        if (warnDoc.warnings.length >= 3) {
            return message.channel.send(new Discord.MessageEmbed()
                .setAuthor('Error 403', message.author.avatarURL())
                .setDescription('**➥** You can\'t warn this member as they already have 3 warnings.')
                .setTimestamp(message.createdAt)
                .setFooter("Made by Aristotelhs#1406")
                .setColor(colors.red))
        }

        warnDoc.warnings.push(reason)
        warnDoc.moderator.push(message.member.id)
        warnDoc.date.push(Date.now())

        await warnDoc.save().catch(err => console.log(err))
    }

    message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .addField("**Memeber**", `${mentionedMember}`)
        .addField("**Action**", "Unmute")
        .addField("**Reason**", `${reason ? `${reason}` : ''}`)
        .setTimestamp(message.createdAt)
        .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter("Made by Aristotelhs#1406")
        .setColor(colors.warn))

}

module.exports.help = {
    name: "warn"
}