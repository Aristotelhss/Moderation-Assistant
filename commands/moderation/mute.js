const Discord = require('discord.js');
const ms = require('ms');
const muteModel = require('../../models/mute');
const colors = require('../../settings/colors.json');

module.exports.run = async (client, message, args) => {

    const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

    const msRegex = RegExp(/(\d+(s|m|h|w))/)
    let muteRole = message.guild.roles.cache.find(r => r.name == 'Muted')

    if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You don\'t have permission to mute members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!message.guild.me.hasPermission(['MANAGE_ROLES', 'MANAGE_CHANNELS'])) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** I don\'t have permisison to MANAGE_ROLES and MANAGE_CHANNELS.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!mentionedMember) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You need to mention a member you want to mute.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!msRegex.test(args[1])) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** That is not a valid amount of time to mute member.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    if (!muteRole) {
        muteRole = await message.guild.roles.create({
            data: {
                name: 'Muted',
                color: 'BLACK',
            }
        }).catch(err => console.log(err))
    }

    if (mentionedMember.roles.highest.position >= message.guild.me.roles.highest.position) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** I can\'t mute this member as their roles are higher to mine.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (muteRole.position >= message.guild.me.roles.highest.position) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** I can\'t mute this member beacuse the `Muted` role is higher than mine.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (ms(msRegex.exec(args[1])[1]) > 2592000000) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You can\'t mute a member for mote than a month.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const isMuted = await muteModel.findOne({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
    })

    if (isMuted) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** This member is already muted.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    for (const channel of message.guild.channels.cache) {
        channel[1].updateOverwrite(muteRole, {
            SEND_MESSAGES: false,
            CONNECT: false,
        }).catch(err => console.log(err))
    }

    const noEveryone = mentionedMember.roles.cache.filter(r => r.name !== '@everyone')

    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err))

    for (const role of noEveryone) {
        await mentionedMember.roles.remove(role[0]).catch(err => console.log(err))
    }

    const muteDoc = new muteModel({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
        length: Date.now() + ms(msRegex.exec(args[1])[1]),
        memberRoles: noEveryone.map(r => r),
    })

    await muteDoc.save().catch(err => console.log(err))

    const reason = args.slice(2).join(' ') || 'Not Specified'

    message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .addField("**Memeber**", `${mentionedMember}`)
        .addField("**Action**", "Mute")
        .addField("**Reason**", `${reason ? `${reason}` : ''}`)
        .addField("**Length**", `${msRegex.exec(args[1])[1]}`)
        .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp(message.createdAt)
        .setFooter("Made by Aristotelhs#1406")
        .setColor(colors.mute))

}

module.exports.help = {
    name: "mute"
}