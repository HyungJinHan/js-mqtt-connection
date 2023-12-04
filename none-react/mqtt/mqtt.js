const mqtt = require("mqtt");
const fs = require("fs");

require("dotenv").config();

const client = mqtt.connect(
  "mqtts://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com:8883",
  {
    key: fs.readFileSync("mqtt/private.pem.key"),
    cert: fs.readFileSync("mqtt/certification.crt"),
    ca: fs.readFileSync("mqtt/root_ca.pem"),
    protocolId: "MQTT",
    protocolVersion: 5,
  }
);

client.on("connect", () => {
  console.log("Connected to MQTT Broker");

  const default_topic = "odn/+/sensors";
  const topics = [`${default_topic}`];

  topics.map((topic) => {
    return client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to "${topic}"\n`);
      }
    });
  });
});

// Handle incoming messages
client.on("message", (topic, message) => {
  const toString_message = message.toString();
  return console.log(`Received message on "${topic}": ${toString_message}\n`);
});

// Handle disconnection
client.on("close", () => {
  console.log("Disconnected from AWS IoT");
});

// Handle errors
client.on("error", (error) => {
  console.error("MQTT Error:", error);
});
