const functions = require("firebase-functions")
const util = require('./util')
const runtimeOpts = { timeoutSeconds: 8, memory: "1GB" }
const region = "asia-southeast2"

exports.LineProxy = functions.region(region).runWith(runtimeOpts).https.onRequest(async (req, res) => {
  if (req.method === "POST") {
    if (!util.verifySignature(req.headers['x-line-signature'], req.body)) {
      return res.status(401).send('Unauthorized')
    }

    let event = req.body.events[0]
    if (event === undefined) {
      return res.end()
    }

    if (event.message !== undefined) {
      if (event.message.type !== "text") {
        util.reply(event.replyToken, { type: "text", text: JSON.stringify(event) })
      } else {
        util.postToDialogflow(req)
      }
    }
  }
  return res.send(req.method)
})

const line = require('./line')
exports.lineBotReply = line.botReply
exports.lineBotPush = line.botPush
exports.lineBotMulticast = line.botMulticast
exports.lineBotBroadcast = line.botBroadcast