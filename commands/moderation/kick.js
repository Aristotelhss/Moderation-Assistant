const Discord = require('discord.js');
const colors = require('../../settings/colors.json');

module.exports.run = async (client, message, args) => {

    const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])

    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.channel.send(new Discord.Message()
            .setAuthor('Error 403', "https://i.imgur.com/QSSHFKI.png")
            .setDescription('**➥** You don\'t have permission to kick members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', "https://i.imgur.com/QSSHFKI.png")
            .setDescription('**➥** I don\'t have permission to kick members.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (!mentionedMember) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', "https://i.imgur.com/QSSHFKI.png")
            .setDescription('**➥** You need to mention a member you want to kick.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const mentionedPosition = mentionedMember.roles.highest.position
    const memberPotition = message.member.roles.highest.position
    const botPotision = message.guild.me.roles.highest.position

    if (memberPotition <= mentionedPosition) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', "https://i.imgur.com/QSSHFKI.png")
            .setDescription('**➥** You can\'t kick this member beacuse their role is higher to yours.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }
    else if (botPotision <= mentionedPosition) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', "https://i.imgur.com/QSSHFKI.png")
            .setDescription('**➥** You can\'t kick this member beacuse their role is higher to mine.')
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const reason = args.slice(1).join(' ') || 'Not Specified'

    try {
        await mentionedMember.kick([reason])

        message.channel.send(new Discord.MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.avatarURL())
            .addField("**Memeber**", `${mentionedMember}`)
            .addField("**Action**", "Kick")
            .addField("**Reason**", `${reason ? `${reason}` : ''}`)
            .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.kick))
            
    }
    catch (error) {
        console.log(error)
        message.channel.send('There was an error kicking this member!')
    }

}

module.exports.help = {
    name: "kick"
}