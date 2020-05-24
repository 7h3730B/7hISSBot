const fetch = require("node-fetch");

module.exports.info = {
    name: "isspass",
    description: "calculates the passes of a given location",
    explanation: "\"this will compute the next n number of times that the ISS will be overhead. Overhead is defined as 10° in elevation for the observer.The times are computed in UTC and the length of time that the ISS is above 10° is in seconds. This gives you enough information to compute pass times for up to several weeks, but beware! times are less and less accurate as you go into the future.This is because the orbit of the ISS decays unpredictably over time and because station controllers periodically move the station to higher and lower orbits for docking, re - boost, and debris avoidance.\" - [open-notify.com](http://open-notify.org/Open-Notify-API/ISS-Pass-Times/)",
    usage: "isspass <Longitude> <Latitude> [Altitude]",
    example: "isspass 45.0 -122.3 20",
    aliases: ["ip", "is"]
};

module.exports.run = async (client, message, args) => {
    if (!args[1] && !args[2]) return message.channel.send(this.info.usage);
    fetch(`http://api.open-notify.org/iss-pass.json?lat=${args[2]}&lon=${args[1]}${args[3] ? ("&alt=" + args[2]) : ""}`)
        .then(rs => rs.json())
        .then(json => {
            console.log(json);
            if (json["message"] != "success") return message.channel.send("Something failed");
            client.embed({
                title: "ISSs location",
                description: json['response'].forEach((d) => {
                    const date = new Date(d['risetime'] * 1000);
                    return date.toString();
                })
            }).then((embed) => message.channel.send(embed));
        });
};