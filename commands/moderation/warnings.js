const warnModel = require('../../models/warn');
const Discord = require("discord.js");
const colors = require('../../settings/colors.json');

module.exports.run = async (client, message, args) => {

    const mentionedMember = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])
        || message.member

    const warnDoc = await warnModel.findOne({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
    }).catch(err => console.log(err))

    if (!warnDoc || !warnDoc.warnings.length) {
        return message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Error 403', message.author.avatarURL())
            .setDescription(`**➥** ${mentionedMember} dosn't have any warnings.`)
            .setTimestamp(message.createdAt)
            .setFooter("Made by Aristotelhs#1406")
            .setColor(colors.red))
    }

    const data = []

    for (let i = 0; warnDoc.warnings.length > i; i++) {
        data.push(`**Warning:** ${i + 1}`)
        data.push(`**Reason:** ${warnDoc.warnings[i]}`)
        data.push(`**Moderator:** ${await message.client.users.fetch(warnDoc.moderator[i]).catch(() => 'Deleted User')}`)
        data.push(`**Date:** ${new Date(warnDoc.date[i]).toLocaleDateString()}\n`)
    }

    const embed = {
        color: colors.blue,
        thumbnail: {
            url: mentionedMember.user.displayAvatarURL({ dynamic: true })
        },
        description: data.join('\n'),
    }
        
    message.channel.send({ embed: embed })

}

module.exports.help = {
    name: "warnings"
}