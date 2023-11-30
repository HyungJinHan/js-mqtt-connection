import { IQueryInput, IQueryItem } from "../../interface";
const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

const REGION = process.env.AWS_REGION;

const NOW = new Date();
const TODAY = NOW.getTime();
const YESTERDAY = new Date(NOW.setDate(NOW.getDate() - 1)).getTime();

const DEVICE = "ansim01";
const TABLE = "oxygen";
const LIMIT = 10;

let INPUT_VALUES: IQueryInput;

INPUT_VALUES = {
  ExpressionAttributeNames: {
    "#id": "device_id",
    "#time": "measure_time",
  },
  ExpressionAttributeValues: {
    ":device": {
      S: `${DEVICE}`,
    },
    ":yesterday": {
      N: `${YESTERDAY}`,
    },
    ":today": {
      N: `${TODAY}`,
    },
  },
  KeyConditionExpression:
    "#id = :device AND #time BETWEEN :yesterday AND :today",
  ScanIndexForward: false,
  Limit: LIMIT,
  TableName: `${TABLE}`,
};

const PAYLOAD_MAP = (items: any[]): void => {
  items.map((item: IQueryItem) => {
    try {
      const measure_time = item.Payload.M.measure_time.N;
      const value = parseFloat(item.Payload.M.oxygen_mpl.M.value.N).toFixed(2);
      const unit = item.Payload.M.oxygen_mpl.M.unit.S;
      return console.log({
        measure_time: measure_time,
        oxygen_mpl: `${value} ${unit}`,
      });
    } catch (err) {
      return console.error(err);
    }
  });
};

const queryCommand = async (): Promise<void> => {
  const client = new DynamoDBClient({ region: REGION });
  const command = new QueryCommand({ ...INPUT_VALUES });

  try {
    const response = await client.send(command);
    PAYLOAD_MAP(response.Items);

    return console.log(
      "\n\n",
      {
        QueryCommand: { range: `${YESTERDAY} ~ ${TODAY}`, response: response },
      },
      "\n\n"
    );
  } catch (err) {
    return console.error(err);
  }
};

queryCommand();
