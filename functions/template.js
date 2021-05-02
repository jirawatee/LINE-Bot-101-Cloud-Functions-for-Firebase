const linepay = () => ({
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "body": {
      "type": "box",
      "layout": "vertical",
      "spacing": "md",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "Burger",
                  "weight": "bold",
                  "margin": "sm",
                  "flex": 0
                },
                {
                  "type": "text",
                  "text": "1฿",
                  "size": "sm",
                  "align": "end",
                  "color": "#aaaaaa"
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "style": "primary",
          "color": "#905c44",
          "action": {
            "type": 'postback',
            "label": "burger",
            "data": "item=burger"
          }
        }
      ]
    }
  }
});

const linehack = (data) => ({
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "size": "giga",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "image",
              "url": "https://mokmoon.com/images/LINEDEV.png",
              "aspectRatio": "3:1",
              "size": "lg",
              "align": "start",
              "flex": 1
            },
            {
              "type": "image",
              "url": "https://mokmoon.com/images/GDGBKK.png",
              "aspectRatio": "3:1",
              "size": "lg",
              "align": "start",
              "flex": 2,
              "margin": "none"
            }
          ],
          "paddingStart": "12%"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "xxx",
              "contents": [
                {
                  "type": "span",
                  "text": "LINE HACK 2020",
                  "size": "3xl",
                  "color": "#ffffff",
                  "weight": "bold"
                },
                {
                  "type": "span",
                  "text": ";",
                  "weight": "bold",
                  "color": "#0053ea",
                  "size": "3xl"
                }
              ]
            },
            {
              "type": "text",
              "text": data.title,
              "color": "#00ff00",
              "weight": "bold",
              "size": "lg",
              "margin": "lg"
            },
            {
              "type": "text",
              "text": data.date,
              "color": "#ffffff",
              "weight": "bold",
              "size": "lg"
            }
          ],
          "paddingStart": "12%",
          "paddingTop": "4%",
          "paddingBottom": "8%",
          "paddingEnd": "8%"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "height": "32px",
              "cornerRadius": "sm",
              "background": {
                "type": "linearGradient",
                "angle": "0deg",
                "startColor": "#002e83",
                "endColor": "#0053ea",
                "centerColor": "#0053ea",
                "centerPosition": "32%"
              },
              "width": "12%"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "height": "32px",
              "cornerRadius": "sm",
              "background": {
                "type": "linearGradient",
                "angle": "0deg",
                "startColor": "#002e83",
                "endColor": "#0053ea",
                "centerColor": "#0053ea",
                "centerPosition": "32%"
              },
              "margin": "48px",
              "width": "64%"
            }
          ],
          "margin": "xxl"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "width": "24%",
              "height": "32px",
              "cornerRadius": "sm",
              "background": {
                "type": "linearGradient",
                "angle": "0deg",
                "startColor": "#002e83",
                "endColor": "#0053ea",
                "centerColor": "#0053ea",
                "centerPosition": "32%"
              }
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "background": {
                "type": "linearGradient",
                "angle": "0deg",
                "startColor": "#008215",
                "endColor": "#00ea23",
                "centerColor": "#00ea23",
                "centerPosition": "32%"
              },
              "height": "32px",
              "width": "28%",
              "cornerRadius": "sm",
              "margin": "48px"
            }
          ],
          "margin": "xl"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [],
              "width": "25%",
              "height": "32px",
              "cornerRadius": "sm",
              "background": {
                "type": "linearGradient",
                "angle": "0deg",
                "startColor": "#002e83",
                "endColor": "#0053ea",
                "centerColor": "#0053ea",
                "centerPosition": "32%"
              }
            }
          ],
          "margin": "xl",
          "paddingStart": "12%"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "HACK_CONNECT_TOMORROW_",
              "weight": "bold",
              "color": "#0053ea"
            }
          ],
          "paddingStart": "12%",
          "margin": "xxl"
        }
      ],
      "paddingBottom": "8%",
      "paddingEnd": "none",
      "paddingStart": "none",
      "paddingTop": "8%"
    },
    "styles": {
      "header": {
        "backgroundColor": "#1b1b1b"
      },
      "hero": {
        "backgroundColor": "#1b1b1b"
      },
      "body": {
        "backgroundColor": "#1b1b1b"
      }
    }
  }
});

const gold = (prices) => ({
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "size": "giga",
    "body": {
      "type": "box",
      "layout": "vertical",
      "paddingAll": "8%",
      "backgroundColor": "#FFF9E2",
      "contents": [
        {
          "type": "text",
          "text": "ราคาทองคำ",
          "weight": "bold",
          "size": "xl",
          "align": "center"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "xxl",
          "spacing": "sm",
          "contents": [
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "ราคารับซื้อ",
                  "wrap": true,
                  "color": "#E2C05B",
                  "flex": 5,
                  "align": "end"
                },
                {
                  "type": "text",
                  "text": "ราคาขาย",
                  "flex": 2,
                  "color": "#E2C05B",
                  "align": "end"
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "ทองคำแท่ง",
                  "flex": 3
                },
                {
                  "type": "text",
                  "text": prices[0],
                  "wrap": true,
                  "size": "sm",
                  "flex": 2,
                  "align": "end"
                },
                {
                  "type": "text",
                  "text": prices[1],
                  "flex": 2,
                  "size": "sm",
                  "align": "end"
                }
              ]
            },
            {
              "type": "separator"
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "ทองรูปพรรณ",
                  "flex": 3
                },
                {
                  "type": "text",
                  "text": prices[2],
                  "wrap": true,
                  "size": "sm",
                  "flex": 2,
                  "align": "end"
                },
                {
                  "type": "text",
                  "text": prices[3],
                  "flex": 2,
                  "size": "sm",
                  "align": "end"
                }
              ]
            }
          ]
        }
      ]
    }
  }
});

const covid = (reports) => ({
  "type": "flex",
  "altText": "Flex Message",
  "contents": {
    "type": "bubble",
    "size": "giga",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "backgroundColor": "#E1298EFF",
      "contents": [
        {
          "type": "text",
          "text": "ติดเชื้อสะสม",
          "color": "#FFFFFFFF",
          "align": "center"
        },
        {
          "type": "text",
          "text": reports[0],
          "weight": "bold",
          "size": "4xl",
          "color": "#FFFFFFFF",
          "align": "center"
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "horizontal",
      "spacing": "md",
      "contents": [
        {
          "type": "box",
          "layout": "vertical",
          "flex": 1,
          "paddingAll": "2%",
          "backgroundColor": "#046034",
          "cornerRadius": "8px",
          "contents": [
            {
              "type": "text",
              "text": "หายแล้ว",
              "color": "#FFFFFF",
              "align": "center"
            },
            {
              "type": "text",
              "text": reports[1],
              "weight": "bold",
              "size": "xl",
              "color": "#FFFFFF",
              "align": "center"
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "flex": 1,
          "paddingAll": "2%",
          "backgroundColor": "#179C9B",
          "cornerRadius": "8px",
          "contents": [
            {
              "type": "text",
              "text": "รักษาอยู่ใน รพ.",
              "color": "#FFFFFF",
              "align": "center"
            },
            {
              "type": "text",
              "text": reports[2],
              "weight": "bold",
              "size": "xl",
              "color": "#FFFFFF",
              "align": "center"
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "flex": 1,
          "paddingAll": "2%",
          "backgroundColor": "#666666",
          "cornerRadius": "8px",
          "contents": [
            {
              "type": "text",
              "text": "เสียชีวิต",
              "color": "#FFFFFF",
              "align": "center"
            },
            {
              "type": "text",
              "text": reports[3],
              "weight": "bold",
              "size": "xl",
              "color": "#FFFFFF",
              "align": "center"
            }
          ]
        }
      ]
    }
  }
});

module.exports = { linehack, gold, linepay, covid }