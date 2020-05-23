const {
    repository
} = require("../../package.json");

module.exports.info = {
    name: "info",
    description: "Shows you some information about the Bot",
};

module.exports.run = async (client, message, args) => {
    message.channel.send(await client.embed({
        title: "Bot Information",
        fields: [{
                name: "Developer",
                value: "**7h3730B#5491**"
            },
            {
                name: "Github Repository",
                value: `**${repository["url"].replace("git+", "").replace(".git", "")}**`
            },
            {
                name: "Invite",
                value: "**https://discord.com/oauth2/authorize?client_id=514753712632233984&scope=bot&permissions=60480**"
            },
            {
                name: "Uptime Robot",
                value: "**https://stats.uptimerobot.com/7W83qhmWn0**"
            },
            {
                name: "Data is provided by:",
                value: "**https://api.nasa.gov/** and **http://open-notify.org/** \n\n It is updated every 5 Minutes except the ISS location",
            }
        ]
    }));
};