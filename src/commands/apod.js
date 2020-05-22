module.exports.info = {
    name: "apod",
    description: "shows you the Astronomy Picture of the Day",
    aliases: ["a"]
};

module.exports.run = async (client, message, args) => {
    message.channel.send(await client.embed({
        title: client.capi["apod"]["title"],
        url: client.capi["apod"]["hdurl"] ? client.capi["apod"]["hdurl"] : client.capi["apod"]["url"],
        description: client.capi["apod"]["explanation"],
        image: client.capi["apod"]["hdurl"] ? client.capi["apod"]["hdurl"] : client.capi["apod"]["url"],
        footerText: "by: " + client.capi["apod"]["copyright"]
    }));
};