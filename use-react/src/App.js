import mqtt from "mqtt";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const mqttConnect = () => {
    console.log("Connect");

    const client = mqtt.connect(
      `mqtts://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com:8883`,
      {
        // key: fs.readFileSync("/mqtt/private.pem.key"),
        // cert: fs.readFileSync("/mqtt/certification.crt"),
        // ca: fs.readFileSync("/mqtt/root_ca.pem"),
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
            console.log(`Subscribed to ${topic}`);
          }
        });
      });
    });

    // Handle incoming messages
    client.on("message", (topic, message) => {
      const toString_message = message.toString();
      // const json_stringfy_message = JSON.stringify(message);
      // const json_parse_message = JSON.parse(json_stringfy_message);
      // const toString_json_parse_message = JSON.parse(toString_message);
      return console.log(
        `Received message on topic ${topic}: ${toString_message}`
      );
    });

    // Handle errors
    client.on("error", (error) => {
      console.error("MQTT Error:", error);
    });
  };

  const mqttDisconnect = () => {
    console.log("Disconnect");

    const client = mqtt.connect(
      `mqtts://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com:8883`,
      {
        // key: fs.readFileSync("none-react/mqtt/private.pem.key"),
        // cert: fs.readFileSync("none-react/mqtt/certification.crt"),
        // ca: fs.readFileSync("none-react/mqtt/root_ca.pem"),
        protocolId: "MQTT",
        protocolVersion: 5,
      }
    );

    // Handle disconnection
    client.on("close", () => {
      console.log("Disconnected from AWS IoT");
    });

    // Handle errors
    client.on("error", (error) => {
      console.error("MQTT Error:", error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => mqttConnect()}>MQTT Connect</button>
        <button onClick={() => mqttDisconnect()}>MQTT Disconnect</button>
      </header>
    </div>
  );
}

export default App;
