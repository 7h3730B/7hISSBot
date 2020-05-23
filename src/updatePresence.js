module.exports = async (client) => {
    client.user.setActivity("for " + process.env.PREFIX + " help", { type: "WATCHING" })
};