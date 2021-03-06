const fetch = require("node-fetch");

module.exports.pis = async (client) => {
    console.log("Updated pis after: " + await client.msToTime(client.uptime) + " again");
    return await fetch("http://api.open-notify.org/astros.json")
        .then(response => response.json())
        .then(json => {
            if (!json["message"] == "success") return console.log("Could not get people in space");
            client.capi["pis"] = json;
        });
}

module.exports.iss = async (client) => {
    console.log("Updated iss after: " + await client.msToTime(client.uptime) + " again");
    return await fetch("http://api.open-notify.org/iss-now.json")
        .then(response => response.json())
        .then(json => {
            if (!json["message"] == "success") return console.log("Could not get isss location");
            client.capi["iss"] = json;
            client.capi["iss"]["timestamp"] = Date.now();
        });
}

module.exports.apod = async (client) => {
    console.log("Updated apod after: " + await client.msToTime(client.uptime) + " again");
    return await fetch("https://api.nasa.gov/planetary/apod?api_key=" + process.env.NASA + "&hd=true")
        .then(response => response.json())
        .then(json => {
            client.capi["apod"] = json;
        });
}

module.exports.epicn = async (client) => {
    console.log("Updated epicn after: " + await client.msToTime(client.uptime) + " again");
    return await fetch("https://api.nasa.gov/EPIC/api/natural?api_key=" + process.env.NASA)
        .then(response => response.json())
        .then(json => {
            client.capi["epicn"] = json;
        });
}

module.exports.epice = async (client) => {
    console.log("Updated epice after: " + await client.msToTime(client.uptime) + " again");
    return await fetch("https://api.nasa.gov/EPIC/api/enhanced?api_key=" + process.env.NASA)
        .then(response => response.json())
        .then(json => {
            client.capi["epice"] = json;
        });
}