

module.exports = {
    name: 'lastfive',
    description: "this is going to be player's last five games stas=ts",
    execute(message, args, Discord) {
        if (args[0].toLowerCase() === 'help') {
            message.channel.send('USAGE\n\t!lastfive <Username> <Tag>\nExample:\n\t!lastfive Borikhr 420');
            // Pull up player bio
            fetch(`https://api.henrikdev.xyz/valorant/v3/matches/na/Borikhr/420?filter=competitive`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data[0].players);
                });
        } else {
            username = args[0];
            tag = args[1];
            fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/na/${username}/${tag}`)
                .then(response => response.json())
                .then(data => {
                    console.log(imgMap.get(data.data.currenttierpatched.replace(' ', '-')));
                    newEmbed = rankEmbed(Discord, username, tag, data.data.currenttierpatched, data.data.ranking_in_tier, imgMap.get(data.data.currenttierpatched.replace(' ', '-')));
                    message.channel.send({ embeds: [newEmbed] });
                });
        }

    }
}