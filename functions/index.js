const functions = require("firebase-functions");
const request = require("request-promise");

const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer <YOUR-CHANNEL-ACCESS-TOKEN>`
};

const runtimeOpts = {
  timeoutSeconds: 4,
  memory: "2GB"
};

exports.LineBotQuickReply = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onRequest((req, res) => {
    if (req.body.events[0].message.type !== "text") {
      return;
    }
    quickReply(req.body.events[0]);
  });

const quickReply = event => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: event.replyToken,
      messages: [
        {
          type: `text`,
          text: event.message.text,
          quickReply: {
            items: [
              {
                type: `action`,
                action: {
                  type: `cameraRoll`,
                  label: `Camera Roll`
                }
              },
              {
                type: `action`,
                action: {
                  type: `camera`,
                  label: `Camera`
                }
              },
              {
                type: `action`,
                action: {
                  type: `location`,
                  label: `Location`
                }
              },
              {
                type: `action`,
                imageUrl: `https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-1-512.png`,
                action: {
                  type: `message`,
                  label: `Message`,
                  text: `Hello World!`
                }
              },
              {
                type: `action`,
                action: {
                  type: `postback`,
                  label: `Postback`,
                  data: `action=buy&itemid=123`,
                  displayText: `Buy`
                }
              },
              {
                type: `action`,
                imageUrl: `https://icla.org/wp-content/uploads/2018/02/blue-calendar-icon.png`,
                action: {
                  type: `datetimepicker`,
                  label: `Datetime Picker`,
                  data: `storeId=12345`,
                  mode: `datetime`,
                  initial: `2018-08-10t00:00`,
                  max: `2018-12-31t23:59`,
                  min: `2018-08-01t00:00`
                }
              }
            ]
          }
        }
      ]
    })
  });
};

exports.LineBotReply = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onRequest((req, res) => {
    if (req.method === "POST"){
      reply(req.body);
      return res.status(200).send(`Done`);
    } else {
      return res.status(200).send(`Done`);
    }
  });

const reply = bodyResponse => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: bodyResponse.events[0].replyToken,
      messages: [
        {
          type: `text`,
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
      method: `GET`,
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
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/push`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      to: `<YOUR-USER-ID>`,
      messages: [
        {
          type: `text`,
          text: msg
        }
      ]
    })
  })
    .then(() => {
      return res.status(200).send(`Done`);
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
    if (text !== undefined && text.trim() !== ``) {
      return multicast(res, text);
    } else {
      const ret = { message: `Text not found` };
      return res.status(400).send(ret);
    }
  });

const multicast = (res, msg) => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/multicast`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      to: [
        `<USER-ID-1>`,
        `<USER-ID-2>`
      ],
      messages: [
        {
          type: `text`,
          text: msg
        }
      ]
    })
  })
    .then(() => {
      const ret = { message: `Done` };
      return res.status(200).send(ret);
    })
    .catch(error => {
      const ret = { message: `Sending error: ${error}` };
      return res.status(500).send(ret);
    });
};

exports.LineBotActions = functions
  .region("asia-northeast1")
  .runWith(runtimeOpts)
  .https.onRequest((req, res) => {
    actions(req.body.events[0]);
  });

const actions = event => {
  return request({
    method: `POST`,
    uri: `${LINE_MESSAGING_API}/reply`,
    headers: LINE_HEADER,
    body: JSON.stringify({
      replyToken: event.replyToken,
      messages: [
        {
          type: `text`,
          text: JSON.stringify(event)
          /*
					quickReply: {
						items: [
							{
								type: `action`,
								action: {
									type: `postback`,
									label: `Postback`,
									data: `action=buy&itemid=123`,
									displayText: `This message was posted by Postback`
								}
						  	}
						]
					}
					*/
        }
      ]
    })
  });
};
