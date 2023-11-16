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
  const json_message = JSON.parse(message.toString());
  console.log(`Received message on topic ${topic}: ${message}`);
  console.log(`Received message on topic ${topic}: ${json_message}`);
});

// Handle disconnection
client.on("close", () => {
  console.log("Disconnected from AWS IoT");
});

// Handle errors
client.on("error", (error) => {
  console.error("MQTT Error:", error);
});
