module.exports.info = {
    name: "apod",
    description: "shows you the Astronomy Picture of the Day",
    explanation: "\"Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.\" - NASA",
    aliases: ["a"]
};

module.exports.run = async (client, message, args) => {
    message.channel.send(await client.embed({
        title: client.capi["apod"]["title"],
        url: client.capi["apod"]["hdurl"] ? client.capi["apod"]["hdurl"] : client.capi["apod"]["url"],
        description: client.capi["apod"]["explanation"] + "\n\n[View all Pictures since 01.01.2015](https://apod.nasa.gov/apod/archivepix.html)",
        image: client.capi["apod"]["hdurl"] ? client.capi["apod"]["hdurl"] : client.capi["apod"]["url"],
        footerText: client.capi["apod"]["copyright"] ? "by: " + client.capi["apod"]["copyright"] : ""
    }));
};