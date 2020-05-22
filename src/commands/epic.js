module.exports.info = {
    name: "epic",
    description: "shows you the newest picture from EPIC",
    explanation: "\"Daily imagery by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument. Uniquely positioned at the Earth-Sun Lagrange point, EPIC provides full disc imagery of the Earth and captures unique perspectives of certain astronomical events such as lunar transits using a 2048x2048 pixel CCD (Charge Coupled Device) detector coupled to a 30-cm aperture Cassegrain telescope. \" - NASA\n\n[More information here](https://epic.gsfc.nasa.gov)",
    aliases: ["e"],
    usage: "epic [natural|enhanced]",
    example: "epic natural"
};

getxyz = async (data) => {
    return ("x: " + data["x"] + "\ny: " + data["y"] + "\nz: " + data["z"]);
};

getEntries = async (data, urlString) => {
    let entries = [];
    for (let i = 0; i < data.length; i++) {
        entries[i] = {
            description: data[i]["caption"],
            image: "https://epic.gsfc.nasa.gov/archive/" + urlString + "/" + data[i]["date"].split(" ")[0].split("-").join("/") + "/png/" + data[i]["image"] + ".png",
            fields: [{
                    name: "Latitude and Longitude",
                    value: "lat: " + data[i]["coords"]["centroid_coordinates"]["lat"] + "\nlon: " + data[i]["coords"]["centroid_coordinates"]["lon"]
                },
                {
                    name: "Position of the satellite in space",
                    value: await getxyz(data[i]["coords"]["dscovr_j2000_position"])
                },
                {
                    name: "Position of the moon in space",
                    value: await getxyz(data[i]["coords"]["lunar_j2000_position"])
                },
                {
                    name: "Position of the sun in space",
                    value: await getxyz(data[i]["coords"]["sun_j2000_position"])
                },
                {
                    name: "Attitude of the Satellite in quaternion",
                    value: "q0: " + data[i]["coords"]["attitude_quaternions"]["q0"] + "\nq1: " + data[i]["coords"]["attitude_quaternions"]["q1"] + " \nq2: " + data[i]["coords"]["attitude_quaternions"]["q2"] + "\nq3: " + data[i]["coords"]["attitude_quaternions"]["q3"]
                }
            ],
            footerText: "Captured on: " + data[i]["date"].split(" ")[0].split("-").reverse().join(".") + " " + data[i]["date"].split(" ")[1]
        }
    }
    return entries;
}

module.exports.run = async (client, message, args) => {
    if (!args[0] || args[0] == "natural") {
        return client.list(client, message, "EPIC natural Images", await getEntries(client.capi["epicn"], "natural"), 0);
    } else {
        return client.list(client, message, "EPIC natural Images", await getEntries(client.capi["epice"], "enhanced"), 0);
    }
};