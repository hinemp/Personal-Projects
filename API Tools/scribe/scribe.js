const Discord = require('discord.js');
const fs = require('fs');

const prefix = '!';
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// Import commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Scribe is ready!');
});

client.on('messageCreate', message => {
    // If content doesn't start w/ prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'youtube':
            client.commands.get('youtube').execute(message, args);
            break;
        case 'bio':
            client.commands.get('bio').execute(message, args, Discord);
            break;
        case 'rank':
            client.commands.get('rank').execute(message, args, Discord);
            break;
        case 'patch':
            client.commands.get('patch').execute(message, args, Discord);
            break;
        case 'lastfive':
            client.commands.get('lastfive').execute(message, args, Discord);
            break;
        default:
            break;
    }
});

client.login('OTY2NDAzOTk3Njg0NjA5MDc0.YmBP2w.ws-L_tQPnKJlzyvXT5EKoE4KdAI');