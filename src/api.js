const fetch = require("node-fetch");

module.exports.pis = async (client) => {
    return await fetch("http://api.open-notify.org/astros.json")
        .then(response => response.json())
        .then(json => {
            if (!json["message"] == "success") return console.log("Could not get people in space");
            client.capi["pis"] = json;
        });
}

module.exports.apod = async (client) => {
    return await fetch("https://api.nasa.gov/planetary/apod?api_key=" + process.env.NASA + "&hd=true")
        .then(response => response.json())
        .then(json => {
            client.capi["apod"]["copyright"] = json["copyright"];
            client.capi["apod"]["date"] = json["date"];
            client.capi["apod"]["url"] = json["hdurl"] ? json["hdurl"] : json["url"];
            client.capi["apod"]["explanation"] = json["explanation"];
            client.capi["apod"]["title"] = json["title"];
        });
}