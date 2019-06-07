const functions = require("firebase-functions");
const request = require("request-promise");
const runtimeOpts = { timeoutSeconds: 4, memory: "2GB" };
const REGION = "asia-east2";
const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_UID = "YOUR-LINE-USER-ID";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer YOUR-CHANNEL-ACCESS-TOKEN"
};
const OPENWEATHER_API = "https://api.openweathermap.org/data/2.5/weather/";
const OPENWEATHER_APPID = "YOUR-OPENWEATHER-APPID";

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
      to: [LINE_UID, "ANOTHER-LINE-USER-ID"],
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