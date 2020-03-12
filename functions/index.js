const request = require("request-promise")
const functions = require("firebase-functions")
const LINE_MESSAGING_API = "https://api.line.me/v2/bot"
const LINE_USER_ID = "YOUR-LINE-USER-ID"
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer YOUR-LINE-CHANNEL-ACCESS-TOKEN"
}
const OPENWEATHER_API = "https://api.openweathermap.org/data/2.5/weather/"
const OPENWEATHER_APPID = "YOUR-OPEN-WEATHER-APP-ID"

exports.LineBotReply = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    reply(req.body)
  }
  return res.status(200).send(req.method)
})

const reply = bodyResponse => {
  return request.post({
    uri: `${LINE_MESSAGING_API}/message/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [{ type: "text", text: JSON.stringify(bodyResponse) }]
    })
  })
}

exports.LineBotPush = functions.https.onRequest(async (req, res) => {
  let response = await request.get({
    uri: `${OPENWEATHER_API}?appid=${OPENWEATHER_APPID}&units=metric&type=accurate&zip=10330,th`,
    json: true
  })
  const message = `City: ${response.name}\nWeather: ${response.weather[0].description}\nTemperature: ${response.main.temp}`
  return push(LINE_USER_ID, message)
})

const push = async (targetId, msg) => {
  await request.post({
    uri: `${LINE_MESSAGING_API}/message/push`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      to: targetId,
      messages: [{ type: "text", text: msg }]
    })
  })
  return res.status(200).send({ message: `Push: ${msg}` })
}

exports.LineBotMulticast = functions.https.onRequest((req, res) => {
  const text = req.query.text
  if (text !== undefined && text.trim() !== "") {
    return multicast(res, text)
  } else {
    return res.status(400).send({ message: "Text not found" })
  }
})

const multicast = async (res, msg) => {
  await request.post({
    uri: `${LINE_MESSAGING_API}/message/multicast`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      to: [LINE_USER_ID, "Ua0e8dd654eeb56790bc0e342bfd46e1c"],
      messages: [{ type: "text", text: msg }]
    })
  })
  return res.status(200).send({ message: `Multicast: ${msg}` })
}

exports.LineBotBroadcast = functions.https.onRequest((req, res) => {
  const text = req.query.text
  if (text !== undefined && text.trim() !== "") {
    return broadcast(res, text)
  } else {
    const ret = { message: "Text not found" }
    return res.status(400).send(ret)
  }
})

const broadcast = async (res, msg) => {
  await request.post({
    uri: `${LINE_MESSAGING_API}/message/broadcast`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      messages: [{ type: "text", text: msg }]
    })
  })
  return res.status(200).send({ message: `Broadcast: ${msg}` })
}