module.exports = async (client, message) => {
    client.messages++;

    if (message.author == client.user.username || message.author.bot) return;

    if (!message.content.startsWith(";iss")) return;

    const args = message.content.slice(";iss".length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    let cmd = client.cmds.get(cmdName);
    if (!cmd) cmd = await client.cmds.find(cmd => cmd.info.aliases && cmd.info.aliases.includes(cmdName));
    if (!cmd) return;

    client.cmdsExecuted++;

    try {
        cmd.run(client, message, args);
    } catch (e) {
        console.error("Failed to execute a Command: " + e);
    };
}