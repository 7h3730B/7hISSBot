module.exports.info = {
    name: "apod",
    description: "shows you the Astronomy Picture of the Day",
    aliases: ["a"]
};

module.exports.run = async (client, message, args) => {
    message.channel.send(await client.emb({
        title: client.capi["apod"]["title"],
        description: client.capi["apod"]["explanation"],
    }));
};