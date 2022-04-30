const inline_break = `------------------`;
const line_break = `--------------------------------`;

function fieldsJson(games) {
    let f_json = [];
    i = 1;
    games.forEach(game => {
        carry = game.carry;
        carry_kd = `(${carry.stats.kills}/${carry.stats.deaths})`;
        devon = game.devon;
        devon_kd = `(${devon.stats.kills}/${devon.stats.deaths})`;
        f_json.push(
            { name: `${i})\t${game.outcome}`, value: inline_break},
            { name: `${carry_kd} - ${carry.name}\n${devon_kd} - Devon`, value: inline_break}
            // { name: `Carry - ${carry_kd}`, value: inline_break, inline: true },
            // { name: `${devon_kd} - Devon`, value: inline_break, inline: true}
        )
        i++;
    });

    return f_json;
}

function carryEmbed(Discord, username, tag, games) {
    const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle(`${username} Carries Devon`)
        .setURL(`https://tracker.gg/valorant/profile/riot/Spudboy480%23GOLD/overview`)
        .setDescription(line_break)
        .addFields(
            fieldsJson(games)
        );
    return newEmbed;
}

module.exports = {
    name: 'carry',
    description: "this is going to clown devon",
    execute(message, args, Discord) {
        username = args[0] ?? '877241LUNA';
        tag = args[1] ?? '7586';

        fetch(`https://api.henrikdev.xyz/valorant/v3/matches/na/Spudboy480/GOLD?filter=competitive`)
            .then(response => response.json())
            .then(data => {
                let games = [];  // Games Devon played w/ user in Devon's last five
                data.data.forEach(game => {
                    devon = game.players.all_players.find(({ name }) => name == 'Spudboy480');
                    carry = game.players.all_players.find(({ name }) => name == username);
                    if (carry && carry.stats.score > devon.stats.score) {
                        // Find game outcome
                        let our_team;
                        let outcome;
                        carry.team == 'Blue' ? (our_team = game.teams.blue) : (our_team = game.teams.red);
                        if (our_team.rounds_won > our_team.rounds_lost) {
                            outcome = `W  (${our_team.rounds_won}-${our_team.rounds_lost})`;
                        } else if (our_team.rounds_won < our_team.rounds_lost) {
                            outcome = `L    (${our_team.rounds_won}-${our_team.rounds_lost})`; // Extra space bc discord font sucks the W is so fucking wide
                        } else {
                            outcome = `D (${our_team.rounds_won}-${our_team.rounds_lost})`;
                        }
                        games.push( { devon: devon, carry: carry, outcome: outcome} );
                    }
                });
                console.log(games);
                newEmbed = carryEmbed(Discord, username, tag, games);
                message.channel.send({ embeds: [newEmbed] });
            });
    }
}