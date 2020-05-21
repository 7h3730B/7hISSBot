module.exports.info = {
    name: "peopleinspace",
    description: "shows you the people that are in space right now",
    aliases: ["pis"]
};

module.exports.run = async (client, message, args) => {
    let peopleField = "";

    client.capi["pis"]["people"].forEach(human => {
        peopleField += (human.name ? human.name : "no name") + ": " + (human.craft ? ("in space with: " + human.craft + "\n") : "no spacecraft\n");
    });

    message.channel.send(await client.embed({
        title: "People in Space",
        description: "Currently there are " + client.capi["pis"]["number"] + " people in space",
        fields: [{
            name: "name and spacecraft",
            value: peopleField
        }]
    }));
};