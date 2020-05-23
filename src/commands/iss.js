module.exports.info = {
    name: "iss",
    description: "shows you the current location of the ISS",
    aliases: ["i"]
};

module.exports.run = async (client, message, args) => {
    message.channel.send(await client.embed({
        title: "ISSs location"
    }));
};