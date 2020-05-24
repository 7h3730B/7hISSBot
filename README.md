<div align="center">
    <img src="https://raw.github.com/7h3730B/7hISSBot/master/images/pb.png" height="300" />
    <h1>~ 7hISSBot ~</h1>
    <strong>
        A little Discord Bot showing you where the ISS currently is and other space related stuff.
    </strong><br/><br/>
    <img height="28" src="https://img.shields.io/github/license/7h3730B/7hISSBot?style=for-the-badge">
    <img height="28" src="https://img.shields.io/uptimerobot/status/m785018931-558bce40967c59691aa46a96?style=for-the-badge">
    <a href="https://discord.com/oauth2/authorize?client_id=514753712632233984&scope=bot&permissions=60480"><img src="https://img.shields.io/badge/%20-INVITE-FFA726.svg?style=for-the-badge&logo=discord" height="28" /></a>
    <img height="28" src="https://img.shields.io/github/repo-size/7h3730B/7hISSBot?style=for-the-badge">
    <img height="28" src="https://img.shields.io/github/stars/7h3730B/7hISSBot?style=for-the-badge">
    <img height="28" src="https://forthebadge.com/images/badges/built-with-love.svg">

</div>

## Table of Contents

* [Intro](#intro) 
* [Features](#features) 
* [Usage](#usage) 
  + [Invite](#invite)
  + [Selfhost](#selfhost)
* [Dependencies](#dependencies)
* [Acknowledgments](#acknowledgments)
* [License](#license)

## Intro

This is a little Discord Bot i made for me and my friends to show the current location of the ISS and stuff like the [Astronomy Picture of the Day](http://apod.nasa.gov/apod/astropix.html). It uses the [NASA API](https://api.nasa.gov/) and the [Open Notify API](http://open-notify.org/) to get its data. 

## Features

It has a handful of commands + 3  
<img src="https://raw.github.com/7h3730B/7hISSBot/master/images/help_cmd.png">  
7hISSBot can show you the current location of the ISS.  
<img src="https://raw.github.com/7h3730B/7hISSBot/master/images/iss_cmd.png">  
This Bot is able to calculate then the ISS passes over your location.   
<img src="https://raw.github.com/7h3730B/7hISSBot/master/images/isspass_cmd.png">  
Shows you the [Astronomy Picture of the Day](http://apod.nasa.gov/apod/astropix.html)  
<img src="https://raw.github.com/7h3730B/7hISSBot/master/images/apod_cmd.png">  
 
## Usage

You can selfhost 7hISSBot or just invite the official Bot.

#### Invite

<a href="https://discord.com/oauth2/authorize?client_id=514753712632233984&scope=bot&permissions=60480"><img src="https://img.shields.io/badge/%20-INVITE-FFA726.svg?style=for-the-badge&logo=discord" height="30" /></a>

#### selfhost

Make sure you have [git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com/)) installed. 
From your command line:

``` BASH
# Clone this repository
$ git clone https://github.com/7h3730B/7hISSBot.git
# Go into the repository
$ cd 7hISSBot
# Install dependencies
$ npm install
# Make a .env file
$ touch .env
# open the .env file with any editor (here nano)
$ nano .env
```

copy this into your .env file you opened:

``` 
TOKEN=YOUR-DISCORD-TOKEN
NASA=YOUR-NASA-API-TOKEN
PREFIX=";iss"
```

Now replace YOUR-DISCORD-TOKEN with your Discord API token of your bot, which you will get [here](https://discordapp.com/developers/applications) then replace YOUR-NASA-API-TOKEN with the API token you get from NASA [here](https://api.nasa.gov/) and if you really want you can replace the ;iss to your preferred Prefix.

**Make sure there are no spaces before and behind every =**

close your editor (in nano press STRG + O, hit enter to save and then press STRG + X to exit)

``` BASH
# start the Bot
$ npm run start
``` 

# Dependencies
- [discord.js](https://www.npmjs.com/package/discord.js) used to communicate with Discord
- [dotenv](https://www.npmjs.com/package/dotenv) used for parsing the .env file
- [express](https://www.npmjs.com/package/express) used to keep the Bot alive on [glitch.com](https://glitch.com/)
- [node-fetch](https://www.npmjs.com/package/node-fetch) used to send api requests

# Acknowledgments
Thanks to:  
- [NASA](https://www.nasa.gov/) for there amazing research and the [API](https://api.nasa.gov/) Endpoint
- [natronics](https://github.com/natronics) for the open [open-notify](http://open-notify.org/) API
- [glitch](https://glitch.com/) for free hosting
- [uptimerobot](https://uptimerobot.com/) for providing a free uptime tracker

# License
> You can check out the full license [here](https://github.com/7h3730B/7hISSBot/blob/master/LICENSE)<br/> 
This project is licensed under the terms of the **MIT** license.