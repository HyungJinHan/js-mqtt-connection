import mqtt from "mqtt/dist/mqtt.esm";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const client = mqtt.connect(
    // "mqtts://a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com",
    {
      keyPath: "./mqtt/private.pem.key",
      certPath: "./mqtt/certification.crt",
      caPaths: "./mqtt/root_ca.pem",
      hostname: "a3jmtb9lvgjr1c-ats.iot.ap-northeast-2.amazonaws.com",
      protocol: "mqtts",
      // protocolId: "MQTT",
      // protocolVersion: 5,
      // port: 8883,
      // defaultProtocol: "mqtts",
    }
  );

  const mqttConnect = async () => {
    console.log("Connect");
    console.log(client);

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
        <div>
          <button onClick={() => mqttConnect()}>MQTT Connect</button>
          <button onClick={() => mqttDisconnect()}>MQTT Disconnect</button>
        </div>
      </header>
    </div>
  );
}

export default App;
