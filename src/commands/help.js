const {
    readdirSync
} = require("fs");
const {
    join
} = require("path");

module.exports.info = {
    name: "help",
    description: "shows you all commands",
    aliases: ["h"]
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
            description: "Commands:\n" + description
        }))
    }
};