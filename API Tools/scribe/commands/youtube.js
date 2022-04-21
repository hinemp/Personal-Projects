module.exports = {
    name: 'youtube',
    description: "this is a youtube command",
    execute(message, args) {
        if (message.member.roles.cache.has('966443699175313499')) {
            message.channel.send('https://www.youtube.com/watch?v=AUOb9_aAk7U&ab_channel=CodeLyon');
        } else {
            message.channel.send("Fuck you, you're mod now");
            message.member.roles.add('966443699175313499')
        }
    }
}