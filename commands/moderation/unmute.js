const muteModel = require('../../models/mute');
const Discord = require('discord.js');
const colors = require('../../settings/colors.json');

module.exports.run = async (client, message, args) => {

    const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

    const muteRole = message.guild.roles.cache.find(r => r.name == 'Muted')

    if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You don\'t have permission to unmute members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!mentionedMember) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You need to mention a member you want to unmute.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!muteRole) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** This server dosn\'t have a mute role, once you mute a member one will be created!')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const muteDoc = await muteModel.findOne({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
    })

    if (!muteDoc) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** This member is not muted.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (mentionedMember.roles.highest.potision >= message.guild.me.roles.highest.potision) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** I can\'t unmute this member beacuse their roles are higher to mine.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (muteRole.potision >= message.guild.me.roles.highest.potision) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** I can\'t unmute members beacuse the Muted role is higher than mine.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err))

    for (const role of muteDoc.memberRoles) {
        mentionedMember.roles.add(role).catch(err => console.log(err))
    }

    await muteDoc.deleteOne()

    const reason = args.slice(1).join(' ') || 'Not Specified'

    message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .addField("**Memeber**", `${mentionedMember}`)
        .addField("**Action**", "Unmute")
        .addField("**Reason**", `${reason ? `${reason}` : ''}`)
        .setTimestamp(message.createdAt)
        .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter("Made by Aristotelhs#1406")
        .setColor(colors.unmute))

}

module.exports.help = {
    name: "unmute"
}