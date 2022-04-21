function rankEmbed(Discord, username, tag, rank, rr, image) {
    const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle(`${username}'s Rank`)
        .setURL(`https://tracker.gg/valorant/profile/riot/${username}%23${tag}/overview`)
        .setDescription("-----------")
        .addFields(
            { name: 'Username', value: `${username}`, inline: true },
            { name: 'Rank', value: `${rank}`, inline: true},
            { name: 'RR', value: `${rr}/100`, inline: true }
        )
        .setImage(image);
    return newEmbed;
}

function buildImgMap() {
    let names =
       ['Iron-1', 'Iron-2', 'Iron-3', 'Bronze-1', 'Bronze-2', 'Bronze-3',
            'Silver-1', 'Silver-2', 'Silver-3', 'Gold-1', 'Gold-2', 'Gold-3',
            'Platinum-1', 'Platinum-2', 'Platinum-3', 'Diamond-1', 'Diamond-2', 'Diamond-3', 
            'Immortal-1', 'Immortal-2', 'Immortal-3', 'Radiant'];
    let map = new Map();
    for (var i = 3; i <= 24; i++) {
        nameIndex = i - 3;
        map.set(names[nameIndex], `https://img.rankedboost.com/wp-content/uploads/2020/04/${names[nameIndex]}-Valorant-Rank.png`);
    }
    return map;
}

module.exports = {
    name: 'rank',
    description: "this is going to be player's ranks",
    execute(message, args, Discord) {
        imgMap = buildImgMap();
        if (args[0].toLowerCase() === 'help') {
            message.channel.send('USAGE\n\t!rank <Username> <Tag>\nExample:\n\t!rank Borikhr 420');
            // Pull up player bio
            fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/na/Borikhr/420`)
                .then(response => response.json())
                .then(data => {
                    console.log(imgMap.get(data.data.currenttierpatched.replace(' ', '-')));
                    newEmbed = rankEmbed(Discord, `Borikhr`, 420, data.data.currenttierpatched, data.data.ranking_in_tier, imgMap.get(data.data.currenttierpatched.replace(' ', '-')));
                    message.channel.send({ embeds: [newEmbed] });
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