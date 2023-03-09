import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import mysql from "mysql";

let discord_webhook_url = "changeme";
let webhook_input_port = 3000;

let mysql_db_server = "changeme";
let mysql_db_port = "changeme";
let mysql_db_user = "chageme";
let mysql_db_password = "changeme";
let mysql_db_name = "changeme";

let hook_secret = "changeme";
let hook_rev_trigger = "changeme";
let hook_show_user = "changeme";
let hook_show_ip = "changeme";
let hook_show_rev = "changeme";
let hook_show_user_color = "changeme";
let hook_show_dif = "changme";

function padIPv4(ipv4) {
  // extends a IPv4 address to full length
  const work = String(ipv4);
  // replaced return ipv4.replace(/\d+/g, segment => segment.padStart(3, '0'))  regex is slower
  return work
    .split(".")
    .map((segment) => segment.padStart(3, "0"))
    .join(".");
}

function readSettings(settingsFilePath) {
  fs.readFile(settingsFilePath, "utf8", (err, data) => {
    if (err) throw err;
    const settings = JSON.parse(data);
    // This is bad and needs to be done better.
    if (settings.verbose === "yes") {
      console.log("Discord Webhook URL:", settings.discord_webhook_url);
      discord_webhook_url = settings.discord_webhook_url;

      console.log("Webhook Input Port:", settings.webhook_input_port);
      webhook_input_port = settings.webhook_input_port;

      console.log("DB Server:", settings.mysql_db_server);
      mysql_db_server = settings.mysql_db_server;

      console.log("DB Port:", settings.mysql_db_port);
      mysql_db_port = settings.mysql_db_port;

      console.log("DB User:", settings.mysql_db_user);
      mysql_db_user = settings.mysql_db_user;

      console.log("DB Password:", "Here should be your DB Password");
      mysql_db_password = settings.mysql_db_password;

      console.log("DB Name:", settings.mysql_db_name);
      mysql_db_name = settings.mysql_db_name;

      console.log("Hook Secret:", settings.hook_secret);
      hook_secret = settings.hook_secret;

      console.log("Hook Rev Trigger:", settings.hook_rev_trigger);
      hook_rev_trigger = settings.hook_rev_trigger;

      console.log("Hook Show User:", settings.hook_show_user);
      hook_show_user = settings.hook_show_user;

      console.log("Hook Show IP:", settings.hook_show_ip);
      hook_show_ip = settings.hook_show_ip;

      console.log("Hook Show Rev:", settings.hook_show_rev);
      hook_show_rev = settings.hook_show_rev;

      console.log("Hook Show Color:", settings.hook_show_user_color);
      hook_show_user_color = settings.hook_show_user_color;

      console.log("Hook Show Dif:", settings.hook_show_dif);
      hook_show_dif = settings.hook_show_dif;
    } else {
      discord_webhook_url = settings.discord_webhook_url;
      webhook_input_port = settings.webhook_input_port;
      mysql_db_server = settings.mysql_db_server;
      mysql_db_port = settings.mysql_db_port;
      mysql_db_user = settings.mysql_db_user;
      mysql_db_password = settings.mysql_db_password;
      mysql_db_name = settings.mysql_db_name;
      hook_secret = settings.hook_secret;
      hook_rev_trigger = settings.hook_rev_trigger;
      hook_show_user = settings.hook_show_user;
      hook_show_ip = settings.hook_show_ip;
      hook_show_rev = settings.hook_show_rev;
      hook_show_user_color = settings.hook_show_user_color;
      hook_show_dif = settings.hook_show_dif;
    }
  });
}

//Setup
const settingsFilePath = "./settings.json";
readSettings(settingsFilePath);


//Settings are read, now start Express Server
const app = express()
//Tell it to use JSON
app.use(bodyParser.json())
app.listen(webhook_input_port, () => console.log(`Express Server now running on port ${webhook_input_port}`))
app.post('/hook', (req, res) => {
  console.log('Input in String Format:' + JSON.stringify(req.body))
  res.status(200).end()
  // The data to send
  const ipstring = 'Send from IP: ' + JSON.stringify(req.body).match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)
  const str = JSON.stringify(req.body)
  const start = str.indexOf('"pads":{') + 8
  const end = str.indexOf(':[{')
  const padName = 'Welches Pad: ' + str.substring(start, end)
  const rev = str.match(/"rev":(\d+)/)[1]
  console.log(rev)
  console.log(padName)
  console.log(ipstring)
  const obj = JSON.parse(str)
  const userId = obj.pads["Dokument-2"][0].userId
  console.log('User ID is: ' + userId)
  const prepardUsername = padIPv4(JSON.stringify(req.body).match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/))

  const data = {
    content: 'userId',
    avatar_url: 'https://purepng.com/public/uploads/large/big-green-watermelon-t18.png',
    username: 'ETHERPAD-UPDATE:' + prepardUsername
,
    embeds: [{
      title: ipstring,
      description: padName + ' REV: ' + rev
    }]
  }

  // Make the POST request
  fetch(discord_webhook_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => console.log('Webhook was send to Discord!'))
    .catch(err => console.error(err))
})