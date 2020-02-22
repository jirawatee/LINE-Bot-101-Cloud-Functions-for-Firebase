const functions = require("firebase-functions");
const request = require("request-promise");
const runtimeOpts = { timeoutSeconds: 4, memory: "2GB" };
const REGION = "asia-east2";
const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_CHANNEL_SECRET = "YOUR-LINE-CHANNEL-SECRET";
const LINE_USER_ID = "YOUR-LINE-USER-ID";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer YOUR-LINE-CHANNEL-ACCESS-TOKEN"
};
const DIALOGFLOW_AGENT_ID = "YOUR-DIALOGFLOW-AGENT-ID";
const OPENWEATHER_API = "https://api.openweathermap.org/data/2.5/weather/";
const OPENWEATHER_APPID = "YOUR-OPEN-WEATHER-APP-ID";

const crypto = require('crypto');

exports.LineBotReply = functions.region(REGION).runWith(runtimeOpts).https.onRequest((req, res) => {
  if (req.method === "POST") {
    reply(req.body);
  }
  return res.status(200).send(req.method);
});

const reply = bodyResponse => {
  return request.post({
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [{ type: "text", text: JSON.stringify(bodyResponse) }]
    })
  });
};

exports.LineBotPush = functions.region(REGION).runWith(runtimeOpts).https.onRequest(async (req, res) => {
  let response = await request.get({
    uri: `${OPENWEATHER_API}?appid=${OPENWEATHER_APPID}&units=metric&type=accurate&zip=10330,th`,
    json: true
  });
  const message = `City: ${response.name}\nWeather: ${response.weather[0].description}\nTemperature: ${response.main.temp}`;
  return push(res, message);
});

const push = async (res, msg) => {
  await request.post({
    uri: `${LINE_MESSAGING_API}/push`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      to: LINE_UID,
      messages: [{ type: "text", text: msg }]
    })
  });
  return res.status(200).send({ message: `Push: ${msg}` });
};

exports.LineBotMulticast = functions.region(REGION).runWith(runtimeOpts).https.onRequest((req, res) => {
  const text = req.query.text;
  if (text !== undefined && text.trim() !== "") {
    return multicast(res, text);
  } else {
    return res.status(400).send({ message: "Text not found" });
  }
});

const multicast = async (res, msg) => {
  await request.post({
    uri: `${LINE_MESSAGING_API}/multicast`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      to: [LINE_USER_ID, "Ua0e8dd654eeb56790bc0e342bfd46e1c"],
      messages: [{ type: "text", text: msg }]
    })
  });
  return res.status(200).send({ message: `Multicast: ${msg}` });
};

exports.LineBotBroadcast = functions.region(REGION).runWith(runtimeOpts).https.onRequest((req, res) => {
  const text = req.query.text;
  if (text !== undefined && text.trim() !== "") {
    return broadcast(res, text);
  } else {
    const ret = { message: "Text not found" };
    return res.status(400).send(ret);
  }
});

const broadcast = async (res, msg) => {
  await request.post({
    uri: `${LINE_MESSAGING_API}/broadcast`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      messages: [{ type: "text", text: msg }]
    })
  });
  return res.status(200).send({ message: `Broadcast: ${msg}` });
};

exports.LineProxy = functions.region(REGION).runWith(runtimeOpts).https.onRequest((req, res) => {
  if (req.method === "POST") {
    console.info("Header Payload", JSON.stringify(req.headers));
    console.info("Body Payload", JSON.stringify(req.body));

    const text = JSON.stringify(req.body);
    const signature = crypto.createHmac('SHA256', LINE_CHANNEL_SECRET).update(text).digest('base64').toString();
    if (signature !== req.headers['x-line-signature']) {
      return res.status(401).send('Unauthorized');
    }

    let event = req.body.events[0]
    if (event.message !== undefined) {
      if (event.message.type !== "text") {
        reply(req.body);
      } else {
        postToDialogflow(req);
      }
    }
  }
  return res.status(200).send(req.method);
});

const postToDialogflow = payloadRequest => {
  //payloadRequest.headers.host = "bots.dialogflow.com";
   payloadRequest.headers.host = "dialogflow.cloud.google.com";
  return request.post({
    //uri: `https://bots.dialogflow.com/line/${DIALOGFLOW_AGENT_ID}/webhook`,
    uri: `https://dialogflow.cloud.google.com/v1/integrations/line/webhook/${DIALOGFLOW_AGENT_ID}`,
    //headers: {
    //"x-line-signature": payloadRequest.headers["x-line-signature"],
    //"content-type": "application/json;charset=UTF-8"
    //},
    headers: payloadRequest.headers,
    body: JSON.stringify(payloadRequest.body)
  });
};