const updatePresence = require("../updatePresence");
const {
    pis,
    apod,
    epicn,
    epice,
    iss
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
    iss(client);
    setInterval(() => iss(client), 24000); // Updates every 24 seconds
    setInterval(() => {
        pis(client);
        apod(client);
        epicn(client);
        epice(client);    
    }, 300000); // sends a Request every 5 Minutes = NASA API REQUEST per hour = 12 x 3 with start 13 x 3
};