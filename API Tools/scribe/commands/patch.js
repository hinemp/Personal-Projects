module.exports = {
    name: 'patch',
    description: "this is going to be the most recent patch",
    execute(message, args, Discord) {
        fetch(`https://api.henrikdev.xyz/valorant/v1/website/en-us?filter=game_updates`)
            .then(response => response.json())
            .then(data => {
                message.channel.send(data.data[0].url);
            });
    }
}