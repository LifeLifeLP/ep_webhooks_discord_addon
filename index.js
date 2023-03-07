import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import mysql from 'mysql'

function padIPv4 (ipv4) { // extends a IPv4 address to full length
    const work = String(ipv4)
    // replaced return ipv4.replace(/\d+/g, segment => segment.padStart(3, '0'));  regex is slower
    return work.split('.').map(segment => segment.padStart(3, '0')).join('.')
  }

