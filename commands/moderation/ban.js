const userReg = RegExp(/<@!?(\d+)>/);
const Discord = require('discord.js');
const colors = require('../../settings/colors.json');

module.exports.run = async (client, message, args) => {

    const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0]
    const mentionedUser = await message.client.users.fetch(userID)

    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You don\'t have permission to ban members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** I don\'t have permission to ban members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!mentionedUser) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** You need to mention a member to ban.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const allBans = await message.guild.fetchBans()

    if (allBans.get(mentionedUser.id)) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription('**➥** This member is already banned.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const mentionedMember = message.guild.members.cache.get(mentionedUser.id)

    if (mentionedMember) {
        const mentionedPotision = mentionedMember.roles.highest.position
        const memberPosition = message.member.roles.highest.position
        const botPotision = message.guild.me.roles.highest.position

        if (memberPosition <= mentionedPotision) {
            return message.channel.send(new Discord.MessageEmbed()
                .setAuthor('Error 403', message.author.avatarURL())
                .setDescription('**➥** You can\'t ban this member beacuse their roles are higher to yours.')
                .setTimestamp(message.createdAt)
                .setFooter("Made by Aristotelhs#1406")
                .setColor(colors.red))
        }
        else if (botPotision <= mentionedPotision) {
            return message.channel.send(new Discord.MessageEmbed()
                .setAuthor('Error 403', message.author.avatarURL())
                .setDescription('**➥** I can\'t ban this member beacuse their roles are higher to mine.')
                .setTimestamp(message.createdAt)
                .setFooter("Made by Aristotelhs#1406")
                .setColor(colors.red))
        }
    }

    const reason = args.slice(1).join(' ') || 'Not Specified'

    message.guild.members.ban(mentionedUser.id, { reason: reason })

    message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL())
        .addField('**Member**', `${mentionedUser}`)
        .addField("**Action**", "Ban")
        .addField("**Reason**", `${reason ? `${reason}` : ''}`)
        .setTimestamp(message.createdAt)
        .setThumbnail(mentionedUser.displayAvatarURL({ dynamic: true }))
        .setFooter("Made by Aristotelhs#1406")
        .setColor(colors.ban))
        
}

module.exports.help = {
    name: "ban"
}