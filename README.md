# JavaScript (node) MQTT 연결 Test

### 연결에 필요한 라이브러리

```json
  "dependencies": {
    "dotenv": "^16.3.1", // -> ca, key, pem key 환경변수 처리를 위함
    "fs": "^0.0.1-security", // -> ca, key, pem key 읽어오기를 위함
    "mqtt": "^5.2.2", // -> mqtt 연결을 위한 메인 라이브러리
    "nodemon": "^3.0.1" // -> 수정 사항 즉각 반영을 위함
  }
```

### 기본 세팅

- `MQTT`는 `AWS Ito Core` 서비스를 사용

  - 별도의 테스트용 사물 생성을 통해 해당 `MQTT Broker`에 필요한 보안 키 발급
  - 엔드포인트와 포트는 AWS를 통해 생성된 url을 사용
  - `MQTT` 버전은 `5`

- 해당 보안 키는 환경변수 처리하여 숨김으로 처리

  - `dotenv` 라이브러리 사용을 통한 환경변수 사용
  - `fs` 라이브러리를 통해 로컬의 보안 키의 내용 읽어오기

### Topic

- 기본적인 `Topic`은 `odn/ansim01/sensors/oxygen`

  - 용존산소 데이터 받아오는 `Topic`
  - 이 외의 `Topic` 설정은 `MQTT`의 `Topic` 설정을 별도로 해야 사용 가능

### 데이터 형식

- 기본적으로 `JavaScript` 기준으로는 `object`로 출력

  - `binary` 형식으로 데이터가 들어오며, 파싱되서 `JSON` 형식으로 보여지는 것 같음
  - `stringify`와 같은 데이터 변환을 통해 사용해야 할 듯

- 자주 사용되는 `REST API`와 같이 `key` 값을 통해 원하는 데이터를 별도로 가져올 수 없음

  - 위의 작업을 진행하기 위해서는 원하는 데이터만을 `subscribe`할 수 있는 별도의 `Topic`을 지정해야 함

### 연결 테스트

- 기본적으로 사용 방식은 `WebSocket` 방식과 유사함

  <details>
    <summary>코드 확인하기</summary>

  ```JavaScript
  const client = mqtt.connect(
    `mqtts://${process.env.AWS_ENDPOINT}:${process.env.AWS_PORT}`,
    {
      key: fs.readFileSync("MQTT_private.pem.key"),
      cert: fs.readFileSync("MQTT_certification.crt"),
      ca: fs.readFileSync("MQTT_root_ca.pem"),
      // username: "xxxxxxxxx",
      // password: "xxxxxxxx",
      protocolId: "MQTT",
      protocolVersion: 5,
    }
  );

  // Handle connect
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
    const toString_message = message.toString();
    console.log(`Received message on topic ${topic}: ${toString_message}`);
  });

  // Handle disconnection
  client.on("close", () => {
    console.log("Disconnected from AWS IoT");
  });

  // Handle errors
  client.on("error", (error) => {
    console.error("MQTT Error:", error);
  });
  ```

  </details>

  <details>
    <summary>결과 확인하기</summary>

  ```Bash
    Received message on topic odn/ansim01/sensors/oxygen: {
            "device_id":    "ansim01",
            "serial_number":        "SN-PODOC-3733",
            "measure_time": 1700528391592,
            "coordinates":  {
                    "latitude":     34.444290161132812,
                    "longitude":    127.02430725097656
            },
            "temperature":  {
                    "value":        14.46302604675293,
                    "unit": "°C"
            },
            "oxygen_per":   {
                    "value":        19.961397171020508,
                    "unit": "%"
            },
            "oxygen_mpl":   {
                    "value":        2.0468096733093262,
                    "unit": "mg/L"
            },
            "oxygen_ppm":   {
                    "value":        2.0468096733093262,
                    "unit": "ppm"
            }
    }
  ```

  </details>

- 로컬 PC의 슬립 모드 등의 이유로 `MQTT Broker`가 끊길 시, 재접속 시 다시 연결되는 것을 확인

  - 추후 더 확인이 필요

- 데이터 파싱을 통한 필요 데이터만을 추출하는 방식 연구가 필요
