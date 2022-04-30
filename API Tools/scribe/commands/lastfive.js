const line_break = `----------------------------------------------`;
const inline_break = `---------------`;

function fieldsJson(games) {
    let f_json = []
    i = 1
    games.forEach(game => {
        f_json.push(
            { name: `${i})\t${game.record}\t${game.map.padEnd(10, ' ')}K/D: (${game.kills}/${game.deaths})`, value: line_break }
        )
        i++;
    });

    // Stats across all games
    const kills = games.reduce((accumulator, game) => { return accumulator + game.kills; }, 0);
    const deaths = games.reduce((accumulator, game) => { return accumulator + game.deaths; }, 0);
    kd = (kills/deaths).toFixed(2);
    f_json.push(
        { name: `Last 5 K/D\n${kd}`, value: inline_break, inline: true},
        { name: `Average Kills\n${(kills/5).toFixed(2)}`, value: inline_break, inline: true}
    );
    return f_json;
}

function fiveEmbed(Discord, username, tag, games) {
    const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle(`${username}'s Last Five Games`)
        .setURL(`https://tracker.gg/valorant/profile/riot/${username}%23${tag}/overview`)
        .setDescription(line_break)
        .addFields(
            fieldsJson(games)
        );
    return newEmbed;
}

module.exports = {
    name: 'lastfive',
    description: "this is going to be player's last five games stas=ts",
    execute(message, args, Discord) {
        if (args[0].toLowerCase() === 'help') {
            message.channel.send('USAGE\n\t!lastfive <Username> <Tag>\nExample:\n\t!lastfive Borikhr 420');
        } else {
            username = args[0];
            tag = args[1];
            fetch(`https://api.henrikdev.xyz/valorant/v3/matches/na/${username}/${tag}?filter=competitive`)
                .then(response => response.json())
                .then(data => {
                    let games = [];
                    for (let i = 0; i < 5; i++) {
                        game_data = data.data[i]
                        user_stats = game_data.players.all_players.find(({ name }) => name == username).stats;  // Pull all player info
                        team_name = game_data.players.all_players.find(({ name }) => name == username).team;   // Get user team name
                        let user_team;
                        team_name == 'Blue' ? (user_team = game_data.teams.blue) : (user_team = game_data.teams.red);
                        let record;
                        if (user_team.rounds_won > user_team.rounds_lost) {
                            record = `W  (${user_team.rounds_won}-${user_team.rounds_lost})`.padEnd(11);
                        } else if (user_team.rounds_won < user_team.rounds_lost) {
                            record = `L    (${user_team.rounds_won}-${user_team.rounds_lost})`.padEnd(12); // Extra space bc discord font sucks the W is so fucking wide
                        } else {
                            record = `D (${user_team.rounds_won}-${user_team.rounds_lost})`.padEnd(12);
                        }
                        games.push({
                            kills: user_stats.kills,
                            deaths: user_stats.deaths,
                            map: game_data.metadata.map,
                            record: record
                        });
                    }
                    // console.log(games);
                    newEmbed = fiveEmbed(Discord, username, tag, games);
                    message.channel.send({ embeds: [newEmbed] });
                }); // End Fetch
        }
    }
}