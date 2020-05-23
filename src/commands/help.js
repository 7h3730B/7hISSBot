const {
    readdirSync
} = require("fs");
const {
    join
} = require("path");

module.exports.info = {
    name: "help",
    description: "shows you all commands",
    aliases: ["h"],
    usage: "help [commandName|alias]",
    example: "help info"
};

let description = "";
module.exports.run = async (client, message, args) => {
    if (!args[0]) {
        if (!description) {
            for (const cmdFile of readdirSync(__dirname)) {
                if (!cmdFile.endsWith(".js")) return;
                const cmd = require(join(__dirname, cmdFile));
                description += cmd.info.name + " ~ " + cmd.info.description + "\n";
            }
        }
        message.channel.send(await client.embed({
            title: "Help Embed",
            description: "**Commands:**\n" + description
        }))
    } else {
        const cmdName = args[0].toLowerCase();

        let cmd = client.cmds.get(cmdName);
        if (!cmd) cmd = await client.cmds.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(cmdName));
        if (!cmd) return message.channel.send(await client.embed({
            color: client.colors.error,
            description: "Couldn't find that command."
        }));

        let emb = await client.embed({
            title: cmd.info.name + "s Help Page",
            fields: [{
                name: "description",
                value: cmd.info.description
            }]
        });

        if (cmd.info.aliases) emb.addField("aliases", cmd.info.aliases.join(','));
        if (cmd.info.usage) emb.addField("usage", process.env.PREFIX + " " + cmd.info.usage + "\n\`[] are optional arguments <> are needed arguments\`");
        if (cmd.info.example) emb.addField("example", process.env.PREFIX + " " + cmd.info.example);
        if (cmd.info.explanation) emb.addField("explanation", cmd.info.explanation);

        message.channel.send(emb);
    }
};