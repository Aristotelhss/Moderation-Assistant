const { client } = require('../main.js');
const muteModel = require('../models/mute')

client.on('guildMemberAdd', async member => {

    const muteDoc = await muteModel.findOne({
        guildID: member.guild.id,
        memberID: member.id,
    })
  
    if (muteDoc) {
        const muteRole = member.guild.roles.cache.find(r => r.name == 'Muted')
  
        if (muteRole) member.roles.add(muteRole.id).catch(err => console.log(err))
  
        muteDoc.memberRoles = []
  
        await muteDoc.save().catch(err => console.log(err))
    }

})