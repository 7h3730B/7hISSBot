const updatePresence = require("../updatePresence");

module.exports = async (client) => {
    client.uptime = Date.now();
    console.log("----Bot ready----");
    updatePresence(client);
    setInterval(() => {
        updatePresence(client)
    }, 1080000);
};