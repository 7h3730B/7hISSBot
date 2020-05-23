const {
    version,
    dependencies
} = require("../../package");
const si = require("systeminformation");
const os = require("os");

module.exports.info = {
    name: "stats",
    description: "Shows you stats about the bot"
};

module.exports.run = async (client, message, args) => {
    const cpu = await si.cpu();
    const cpuLoad = await si.currentLoad();
    let dependend = "NodeJS Version: " + process.version + "\n";
    Object.entries(dependencies).forEach((r) => {
        dependend += `~ [${r[0]}](https://npmjs.org/package/${r[0]})${r[1]}\n`;
    });
    message.channel.send(await client.embed({
        title: "Bot Stats",
        fields: [{
                name: "Bot Stats",
                value: `Running for: **${await client.msToTime(client.uptime)}**\nRunning on **${version}**`
            },
            {
                name: "Command Stats",
                value: `**${client.messages}** Messages analyzed\n**${client.cmdsExecuted}** Commands executed`,
            },
            {
                name: "Discord Specs",
                value: `Serving **${client.guilds.cache.size}** Guilds\n**${Math.round(client.ws.ping)}** ms Latency to the Discord API `
            },
            {
                name: "System",
                value: `Memory (binary): ${((os.totalmem() - os.freemem()) / 1.074e+9).toFixed(2)}GiB / ${(os.totalmem() / 1.074e+9).toFixed(2)}GiB\ncore(s): ${cpu.cores} at ${cpu.speed} GHz\nused: ${Math.round(cpuLoad.currentload)} %`
            },
            {
                name: "Dependencies",
                value: dependend.substr(0,1000)
            }
        ]
    }));
};