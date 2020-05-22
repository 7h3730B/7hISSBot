const updatePresence = require("../updatePresence");
const { pis, apod, epicn, epice } = require("../api");

module.exports = async (client) => {
    console.log("----Bot ready----");
    updatePresence(client);
    setInterval(() => {
        updatePresence(client)
    }, 1080000);
    await pis(client);
    setInterval(() => {
        pis(client)
    }, 3.6e+6); // sends a Request every hour
    await apod(client);
    setInterval(() => {
        apod(client)
    }, 300000); // sends a Request every 5 Minutes = NASA API REQUEST per hour = 12 with start 13
    await epicn(client);
    setInterval(() => {
        epicn(client)
    }, 300000); // sends a Request every 5 Minutes = NASA API REQUEST per hour = 12 with start 13
    await epice(client);
    setInterval(() => {
        epice(client)
    }, 300000); // sends a Request every 5 Minutes = NASA API REQUEST per hour = 12 with start 13
};