// const fs = require("fs");
// var mqtt = require("mqtt");
var mqtt;

const client = mqtt.connect(
  "mqtts://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com:8883",
  {
    // key: fs.readFileSync("./key/private.pem.key"),
    // cert: fs.readFileSync("./key/certification.crt"),
    // ca: fs.readFileSync("./key/root_ca.pem"),
    keyPath: "../../key/private.pem.key",
    certPath: "../../key/certification.crt",
    caPaths: "../../key/private.pem.key",
    protocolId: "MQTT",
    protocolVersion: 5,
  }
);

window.addEventListener("load", (event) => {
  connectToBroker();

  const subscribeBtn = document.querySelector("#subscribe");
  subscribeBtn.addEventListener("click", function () {
    subscribeToTopic("odn/+/sensors");
  });

  const unsubscribeBtn = document.querySelector("#unsubscribe");
  unsubscribeBtn.addEventListener("click", function () {
    unsubscribeToTopic("odn/+/sensors");
  });
});

const connectToBroker = () => {
  client.on("connect", () => {
    console.log("Connected to MQTT Broker");
  });

  client.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  client.on("message", (topic, message) => {
    const toString_message = message.toString();
    const messageTextArea = document.querySelector("#message");
    messageTextArea.value += message + "\r\n";
    return console.log(`Received message on "${topic}": ${toString_message}\n`);
  });

  client.on("close", () => {
    console.log("Disconnected from AWS IoT");
  });

  client.on("error", (error) => {
    console.error("MQTT Error:", error);
  });
};

const subscribeToTopic = (topic) => {
  return client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to "${topic}"\n`);
    }
  });
};

const unsubscribeToTopic = (topic) => {
  const status = document.querySelector("#status");
  // const topic = document.querySelector("#topic").value.trim();
  console.log(`Unsubscribing to Topic: ${topic}`);

  client.unsubscribe(topic, { qos: 0 });
  status.style.color = "red";
  status.value = "UNSUBSCRIBED";
};
