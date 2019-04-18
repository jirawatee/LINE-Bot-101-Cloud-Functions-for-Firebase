const functions = require("firebase-functions");
const request = require("request-promise");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_UID = "<YOUR-USER-ID>";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer <YOUR-CHANNEL-ACCESS-TOKEN>"
};

const runtimeOpts = {
  timeoutSeconds: 4,
  memory: "2GB"
};

exports.LineBotReply = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onRequest((req, res) => {
    if (req.method === "POST") {
      reply(req.body);
    }
    return res.status(200).send(req.method);
  });

const reply = bodyResponse => {
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: "text",
          text: JSON.stringify(bodyResponse)
        }
      ]
    })
  });
};

exports.LineBotPush = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onRequest((req, res) => {
    return request({
      method: "GET",
      uri: `https://api.openweathermap.org/data/2.5/weather?appid=<YOUR-APP-ID>&units=metric&type=accurate&zip=10330,th`,
      json: true
    })
      .then(response => {
        const message = `City: ${response.name}\nWeather: ${
          response.weather[0].description
        }\nTemperature: ${response.main.temp}`;
        return push(res, message);
      })
      .catch(error => {
        return res.status(500).send(error);
      });
  });

const push = (res, msg) => {
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/push`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      to: LINE_UID,
      messages: [
        {
          type: "text",
          text: msg
        }
      ]
    })
  })
    .then(() => {
      return res.status(200).send("Done");
    })
    .catch(error => {
      return Promise.reject(error);
    });
};

exports.LineBotMulticast = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onRequest((req, res) => {
    const text = req.query.text;
    if (text !== undefined && text.trim() !== "") {
      return multicast(res, text);
    } else {
      const ret = { message: "Text not found" };
      return res.status(400).send(ret);
    }
  });

const multicast = (res, msg) => {
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/multicast`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      to: [
        LINE_UID,
        "<ANOTHER-USER-ID>"
      ],
      messages: [
        {
          type: "text",
          text: msg
        }
      ]
    })
  })
    .then(() => {
      const ret = { message: "Multicast done" };
      return res.status(200).send(ret);
    })
    .catch(error => {
      const ret = { message: `Multicast error: ${error}` };
      return res.status(500).send(ret);
    });
};

exports.LineBotBroadcast = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onRequest((req, res) => {
    const text = req.query.text;
    if (text !== undefined && text.trim() !== "") {
      return broadcast(res, text);
    } else {
      const ret = { message: "Text not found" };
      return res.status(400).send(ret);
    }
  });

const broadcast = (res, msg) => {
  return request({
    method: "POST",
    uri: `${LINE_MESSAGING_API}/broadcast`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      messages: [
        {
          type: "text",
          text: msg
        }
      ]
    })
  })
    .then(() => {
      const ret = { message: "Broadcast done" };
      return res.status(200).send(ret);
    })
    .catch(error => {
      const ret = { message: `Broadcast error: ${error}` };
      return res.status(500).send(ret);
    });
};