function bioEmbed(Discord, username, tag, region, level, image) {
    const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle(`${username}'s Bio`)
        .setURL(`https://tracker.gg/valorant/profile/riot/${username}%23${tag}/overview`)
        .setDescription("-----------")
        .addFields(
            { name: 'Username', value: `${username}`, inline: true},
            { name: 'Region', value: `${region.toUpperCase()}`, inline: true },
            { name: 'Level', value: `${level}`, inline: true }
        )
        .setImage(`${image}`);
    return newEmbed;
}

module.exports = {
    name: 'bio',
    description: "this is going to be player's bios",
    execute(message, args, Discord) {
        if (args[0].toLowerCase() === 'help') {
            message.channel.send('USAGE\n\t!bio <Username> <Tag>\nExample:\n\t!bio Borikhr 420');
            // Pull up player bio
            fetch(`https://api.henrikdev.xyz/valorant/v1/account/Borikhr/420`)
                .then(response => response.json())
                .then(data => {
                    newEmbed = bioEmbed(Discord, data.data.name, 420, data.data.region, data.data.account_level, data.data.card.small);
                    message.channel.send({ embeds: [newEmbed] });
                });
        } else {
            username = args[0];
            tag = args[1];
            fetch(`https://api.henrikdev.xyz/valorant/v1/account/${username}/${tag}`)
            .then(response => response.json())
            .then(data => {
                newEmbed = bioEmbed(Discord, data.data.name, tag, data.data.region, data.data.account_level, data.data.card.large);
                message.channel.send({ embeds: [newEmbed] });
            });
        }

    }
}