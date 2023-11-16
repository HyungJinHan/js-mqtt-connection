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

  const topic = "odn/ansim01/sensors/oxygen";
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to ${topic}`);
    }
  });
});

// Handle incoming messages
client.on("message", (topic, message) => {
  console.log(
    `Received message on topic (${typeof message.toString()}) ${topic}: ${message.toString()}`
  );
  console.log("");
  console.log("--------------");
  console.log("");
  console.log(
    `Received message on topic (${typeof message}) ${topic}: ${message}`
  );
});

// Handle disconnection
client.on("close", () => {
  console.log("Disconnected from AWS IoT");
});

// Handle errors
client.on("error", (error) => {
  console.error("MQTT Error:", error);
});
