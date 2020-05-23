const {
    Client,
    Collection,
    MessageEmbed
} = require("discord.js");
const env = require("dotenv").config();
const {
    readdirSync
} = require("fs");
const {
    join
} = require("path");

if (env.error) {
    console.warn("[ERROR] Parsing .env file failed");
    process.exit(-1);
}

// Keep alive on glitch.com
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const client = new Client({
    disableMentions: "everyone"
});
client.cmds = new Collection();
client.messages = 0;
client.cmdsExecuted = 0;
client.capi = {};
client.list = async (client, msg, title, entries, page, collector, listMsg) => {
    entries[page].title = title + " " + (page + 1) + "/" + entries.length;
    const embed = await client.embed(entries[page]);
    if (listMsg) listMsg = await listMsg.edit(embed);
    else listMsg = await msg.channel.send(embed);

    collector = listMsg.createReactionCollector((reaction, user) => user.id === msg.author.id, {
        max: 1,
        idle: 20000
    });

    collector.on('collect', r => {
        if (r.emoji.name == client.cemojis.first) {
            if (page != 0) client.list(client, msg, title, entries, 0, collector, listMsg);
        } else if (r.emoji.name == client.cemojis.back) {
            if (page != 0) client.list(client, msg, title, entries, page - 1, collector, listMsg);
        } else if (r.emoji.name == client.cemojis.next) {
            if (page <= entries.length) client.list(client, msg, title, entries, page + 1, collector, listMsg);
        } else if (r.emoji.name == client.cemojis.last) {
            if (page <= entries.length) client.list(client, msg, title, entries, entries.length - 1, collector, listMsg);
        } else if (r.emoji.name == client.cemojis.stop) collector.stop("Stop");
    });

    collector.on('end', (c, r) => {
        listMsg.reactions.removeAll();
        embed.setTitle(title);
        listMsg.edit(embed);
    });

    await listMsg.react(client.cemojis.first);
    await listMsg.react(client.cemojis.back);
    await listMsg.react(client.cemojis.next);
    await listMsg.react(client.cemojis.last);
    await listMsg.react(client.cemojis.stop);
};
client.msToTime = async (duration) => {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 24)

    days = (days < 10) ? "0" + days : days;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return `${days} d ${hours} h ${minutes}min ${seconds} sec`
};
client.cemojis = {
    first: '⏪',
    last: '⏩',
    stop: '⏹',
    back: '◀',
    next: '▶'
}
client.colors = {
    success: "00C412",
    error: "CE0000",
    warn: "7a373b",
    embed: "FCFC07"
};
client.embed = async (opts) => {
    return new MessageEmbed()
        .setTitle(opts.title || "")
        .setAuthor(opts.authorName || "", opts.authorUrl)
        .setDescription(opts.description || "")
        .setThumbnail(opts.thumbnail)
        .setColor(opts.color || client.colors.embed)
        .attachFiles(opts.files || [])
        .addFields(opts.fields || [])
        .setImage(opts.image || "")
        .setURL(opts.url)
        .setTimestamp()
        .setFooter(opts.footerText || "");
};

// Load Commands
for (const cmdFile of readdirSync(join(__dirname, "/commands"))) {
    client.cmds.set(cmdFile.split(".")[0], require(join(__dirname, "/commands/" + cmdFile)));
}
console.info("Loaded all commands");

// Load Events
for (const file of readdirSync(join(__dirname, "/events"))) {
    client.on(file.split(".")[0], require(join(__dirname, "/events/" + file)).bind(null, client));
}
console.info("Loaded all events");

client.on("info", e => console.info(e));
client.on("warn", e => console.warn(e));
client.on("error", e => console.error(e));
process.on("uncaughtException", error => console.error(error));

client.login(process.env.TOKEN);