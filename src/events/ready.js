const updatePresence = require("../updatePresence");
const {
    pis,
    apod,
    epicn,
    epice
} = require("../api");

module.exports = async (client) => {
    console.log("----Bot ready----");
    updatePresence(client);
    setInterval(() => {
        updatePresence(client)
    }, 1080000);
    pis(client);
    apod(client);
    epicn(client);
    epice(client);
    setInterval(() => {
        pis(client);
        apod(client);
        epicn(client);
        epice(client);
    }, 3.6e+6); // sends a Request every 5 Minutes = NASA API REQUEST per hour = 12 with start 13
};