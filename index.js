import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import mysql from 'mysql'
import fs from 'fs'

let discord_webhook_url = 'changeme'
let mysql_db_server = 'changeme'
let mysql_db_port = 'changeme'
let mysql_db_user = 'chageme'
let mysql_db_password = 'changeme'
let mysql_db_name = 'changeme'

function padIPv4 (ipv4) { // extends a IPv4 address to full length
    const work = String(ipv4)
    // replaced return ipv4.replace(/\d+/g, segment => segment.padStart(3, '0'));  regex is slower
    return work.split('.').map(segment => segment.padStart(3, '0')).join('.')
  }

//Setup
const settingsFilePath = './settings.json'

// Read file
fs.readFile(settingsFilePath
, 'utf8', (err, data) => {
  if (err) throw err
  const settings = JSON.parse(data)
  console.log('Discord Webhook URL:', settings.discord_webhook_url)
  discord_webhook_url = settings.discord_webhook_url
  console.log('DB Server::', settings.mysql_db_server)
  mysql_db_server = settings.mysql_db_server
  
});