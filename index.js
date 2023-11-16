const mqtt = require("mqtt");
const fs = require("fs");

require("dotenv").config();

const client = mqtt.connect(
  `mqtts://${process.env.AWS_ENDPOINT}:${process.env.AWS_PORT}`,
  {
    key: fs.readFileSync("./mqtt_key/private.pem.key"),
    cert: fs.readFileSync("./mqtt_key/certification.crt"),
    ca: fs.readFileSync("./mqtt_key/root_ca.pem"),
    protocolId: "MQTT",
    protocolVersion: 5,
  }
);

client.on("connect", () => {
  console.log("Connected to MQTT Broker");

  const default_topic = "odn/ansim01/sensors/oxygen";
  const topics = [`${default_topic}`];

  topics.map((topic) => {
    return client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to ${topic}`);
      }
    });
  });
});

// Handle incoming messages
client.on("message", (topic, message) => {
  // const json_message = JSON.stringify(message);
  console.log(`Received message on topic ${topic}: ${message}`);
  // console.log(`Received message on topic ${topic}: ${json_message}`);
  // 결과
  // Received message on topic odn/ansim01/sensors/oxygen: {"type":"Buffer","data":[123,10,9,34,100,101,118,105,99,101,95,105,100,34,58,9,34,97,110,115,105,109,48,49,34,44,10,9,34,115,101,114,105,97,108,95,110,117,109,98,101,114,34,58,9,34,83,78,45,80,79,68,79,67,45,51,55,51,51,34,44,10,9,34,109,101,97,115,117,114,101,95,116,105,109,101,34,58,9,49,55,48,48,49,49,57,51,48,55,50,48,54,44,10,9,34,99,111,111,114,100,105,110,97,116,101,115,34,58,9,123,10,9,9,34,108,97,116,105,116,117,100,101,34,58,9,51,52,46,52,52,52,50,56,50,53,51,49,55,51,56,50,56,49,44,10,9,9,34,108,111,110,103,105,116,117,100,101,34,58,9,49,50,55,46,48,50,52,51,51,55,55,54,56,53,53,52,54,57,10,9,125,44,10,9,34,116,101,109,112,101,114,97,116,117,114,101,34,58,9,123,10,9,9,34,118,97,108,117,101,34,58,9,49,53,46,52,54,56,53,55,48,55,48,57,50,50,56,53,49,54,44,10,9,9,34,117,110,105,116,34,58,9,34,194,176,67,34,10,9,125,44,10,9,34,111,120,121,103,101,110,95,112,101,114,34,58,9,123,10,9,9,34,118,97,108,117,101,34,58,9,51,50,46,50,55,54,52,55,51,57,57,57,48,50,51,52,51,56,44,10,9,9,34,117,110,105,116,34,58,9,34,37,34,10,9,125,44,10,9,34,111,120,121,103,101,110,95,109,112,108,34,58,9,123,10,9,9,34,118,97,108,117,101,34,58,9,51,46,50,51,54,56,54,48,55,53,50,49,48,53,55,49,50,57,44,10,9,9,34,117,110,105,116,34,58,9,34,109,103,47,76,34,10,9,125,44,10,9,34,111,120,121,103,101,110,95,112,112,109,34,58,9,123,10,9,9,34,118,97,108,117,101,34,58,9,51,46,50,51,54,56,54,48,55,53,50,49,48,53,55,49,50,57,44,10,9,9,34,117,110,105,116,34,58,9,34,112,112,109,34,10,9,125,10,125]}
});

// Handle disconnection
client.on("close", () => {
  console.log("Disconnected from AWS IoT");
});

// Handle errors
client.on("error", (error) => {
  console.error("MQTT Error:", error);
});
