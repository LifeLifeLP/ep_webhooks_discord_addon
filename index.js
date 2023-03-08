import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import mysql from 'mysql'

let discord_webhook_url = 'changeme'

let mysql_db_server = 'changeme'
let mysql_db_port = 'changeme'
let mysql_db_user = 'chageme'
let mysql_db_password = 'changeme'
let mysql_db_name = 'changeme'

let hook_secret = 'changeme'
let hook_rev_trigger = 'changeme'
let hook_show_user = 'changeme'
let hook_show_ip = 'changeme'
let hook_show_rev = 'changeme'
let hook_show_user_color = 'changeme'
let hook_show_dif = 'changme'


function padIPv4 (ipv4) { // extends a IPv4 address to full length
    const work = String(ipv4)
    // replaced return ipv4.replace(/\d+/g, segment => segment.padStart(3, '0'))  regex is slower
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

  console.log('DB Server:', settings.mysql_db_server)
  mysql_db_server = settings.mysql_db_server

  console.log('DB Port:', settings.mysql_db_port)
  mysql_db_port = settings.mysql_db_port
  
  console.log('DB User:', settings.mysql_db_user)
  mysql_db_user = settings.mysql_db_user

  console.log('DB Password:', settings.mysql_db_password)
  mysql_db_password = settings.mysql_db_password

  console.log('DB Name:', settings.mysql_db_name)
  mysql_db_name = settings.mysql_db_name

  console.log('Hook Secret:', settings.hook_secret)
  hook_secret = settings.hook_secret

  console.log('Hook Rev Trigger:', settings.hook_rev_trigger)
  hook_rev_trigger = settings.hook_rev_trigger

  console.log('Hook Show User:', settings.hook_show_user)
  hook_show_user = settings.hook_show_user

  console.log('Hook Show IP:', settings.hook_show_ip)
  hook_show_ip = settings.hook_show_ip

  console.log('Hook Show Rev:', settings.hook_show_rev)
  hook_show_rev = settings.hook_show_rev

  console.log('Hook Show Color:', settings.hook_show_user_color)
  hook_show_user_color = settings.hook_show_user_color

  console.log('Hook Show Dif:', settings.hook_show_dif)
  hook_show_dif = settings.hook_show_dif
})