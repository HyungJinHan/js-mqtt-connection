const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

const REGION = process.env.AWS_REGION;
const CURRENT_TIME = new Date();
const MS_Time = CURRENT_TIME.getTime();

const scanCommand = async () => {
  const client = new DynamoDBClient({ region: REGION });
  const input = {
    ExpressionAttributeNames: {
      "#n0": "device_id",
      "#n1": "measure_time",
    },
    ExpressionAttributeValues: {
      ":v0": {
        S: "ansim01",
      },
      ":v1": {
        N: `${MS_Time}`,
      },
    },
    FilterExpression: "#n0 = :v0 AND #n1 <= :v1",
    TableName: "oxygen",
  };
  const command = new ScanCommand(input);

  try {
    const response = await client.send(command);
    return console.log(
      { "ScanCommand (ansim01 - oxygen)": response },
      // { "ScanCommand Payload (oxygen)": response.Items[0].Payload.M },
      "\n\n"
    );
  } catch (err) {
    return console.error(err);
  }
};

scanCommand();
