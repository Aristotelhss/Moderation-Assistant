<p align="center">
  <img width="256" height="256" src="https://i.imgur.com/9ymIAxt.png?size=512">
</p>

<h3 align="center">Moderation Assistant</h3>

<div align="center">

</div>

---

<p align="center"> Discord Moderation Bot + MongoDB Database, written in JavaScript - Using discord.js, chalk, ms, mongoose. Has many features including: Ban, Kick, Warnings and much more!
    <br> 
</p>


## 📝 Table of Contents 

+ [Setting up the bot](https://github.com/Aristotelhss/Moderation-Assistant/blob/main/README.md#-setting-up-the-bot)
+ [General Commands](https://github.com/Aristotelhss/Moderation-Assistant/blob/main/README.md#-commands)
+ [Music Commands](https://github.com/Aristotelhss/Moderation-Assistant/blob/main/README.md#-commands)
+ [License](https://github.com/Aristotelhss/Moderation-Assistant/blob/main/LICENSE)
+ [GitHub](https://github.com/Aristotelhss)

## 🛠 Setting up the bot 

### Installation
**``1.0``** **Installing Node.js**<br>
Click [here](https://nodejs.org/en/) to install node.js, it is required.<br>

**``1.1``** **Installing Visual Studio Code**<br>
Click [here](https://code.visualstudio.com/) to install visual studio code, it is required to modify your current code.

### Initialising the bot
**``2.0``** **Making an application** <br>
Click [here](https://discord.com/developers) to open discord developer portal. After that create an application

**``2.0.1``** **Making a bot** <br>
When you have already created an application, create a bot. After that get the bot's token. Remmember don't share the token with anyone.

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/728829095013515294/734288747050303519/Untitled_Artwork.jpg?size=512">
</p>

**``2.1``** **Editing settings/secret.json** <br>
Open the downloaded repo folder with visual studio code and locate `settings/secret.json`, after that replace `token` with your bot's token. If you place your Bot token now place your MongoDB URL in `mongo_url`.

**``2.2``** **Editing settings/config.json** <br>
Open the downloaded repo folder with visual studio code and locate `settings/secret.json`, after that replace `prefix` with your bot's prefix.

**``2.3``** **Installing dependancies** <br>
The only dependancy you need in this is Discord Bot, simply run `npm i discord.js`, `npm i mongoose`, `npm i chalk`, `npm i ms` in the terminal.

**``2.4``** **Starting up the bot** <br>
Start the bot up by running the command `node main.js` in the terminal.

## 📜 Moderation Commands
```js
ban [@user] [reason] - Ban the specified user.
kick [@user] [reason] - Kick the specified user.
unban [@user] [reason] - Unban the specified user.

mute [@user] [length] [reason] - Mute the specified user.
unmute [@user] [reason] - Unmute the specified user.

warn [@user] [reason] - Warn the specified user.
unwarn [@user] [id] [reason] - Unwarn the speicified user.
warnings [@user] - See warnings speicified user.
```

## 💡 General Commands
```js
help - See the list of available orders.
```

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Aristotelhss/Moderation-Assistant/blob/main/LICENSE) file for details.

©[Aristotelhs](https://github.com/Aristotelhss)
