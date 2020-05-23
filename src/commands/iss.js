module.exports.info = {
    name: "iss",
    description: "shows you the current location of the ISS",
    aliases: ["i"]
};

module.exports.run = async (client, message, args) => {
    message.channel.send(await client.embed({
        title: "ISSs location",
        image: "https://www.google.com/maps/dir/48.9556995,12.9205939/@48.8534705,12.8210303,11z"
    }));
};