"use strict"

const functions = require("firebase-functions")
const axios = require('axios')
const util = require('./util')

const runtimeOpts = { timeoutSeconds: 8, memory: "4GB" }
const region = "asia-southeast2"
const LINE_USER_ID = functions.config().jirawatee.userid
const OPENWEATHER_API = "https://api.openweathermap.org/data/2.5/weather/"
const OPENWEATHER_APPID = functions.config().jirawatee.openweather_appid

exports.botReply = functions.region(region).runWith(runtimeOpts).https.onRequest((req, res) => {
  if (req.method === "POST") {
    util.reply(
      req.body.events[0].replyToken,
      { type: "text", text: JSON.stringify(req.body) }
    )
  }
  return res.status(200).send(req.method)
})

exports.botPush = functions.region(region).runWith(runtimeOpts).https.onRequest(async (req, res) => {
  const response = await axios({
    method: 'get',
    url: `${OPENWEATHER_API}?appid=${OPENWEATHER_APPID}&units=metric&type=accurate&zip=10330,th`
  })
  const msg = `City: ${response.data.name}\nWeather: ${response.data.weather[0].description}\nTemperature: ${response.data.main.temp}`
  util.push(LINE_USER_ID, { type: "text", text: msg })
  return res.status(200).send({ message: `Push: ${msg}` })
})

exports.botMulticast = functions.region(region).runWith(runtimeOpts).https.onRequest((req, res) => {
  const msg = req.query.msg
  if (msg !== undefined && msg.trim() !== "") {
    util.multicast({ type: "text", text: msg })
    return res.status(200).send({ message: `Multicast: ${msg}` })
  } else {
    return res.status(400).send({ message: "Text not found" })
  }
})

exports.botBroadcast = functions.region(region).runWith(runtimeOpts).https.onRequest((req, res) => {
  const msg = req.query.msg
  if (msg !== undefined && msg.trim() !== "") {
    util.broadcast({ type: "text", text: msg })
    return res.status(200).send({ message: `Broadcast: ${msg}` })
  } else {
    const ret = { message: "Text not found" }
    return res.status(400).send(ret)
  }
})