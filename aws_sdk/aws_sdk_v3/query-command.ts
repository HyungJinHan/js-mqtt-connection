import { IQueryInput, IQueryItem } from "../../interface";
const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

const REGION: string | undefined = process.env.AWS_REGION;

const NOW: Date = new Date();
const TODAY: number = NOW.getTime();
const YESTERDAY: number = new Date(NOW.setDate(NOW.getDate() - 1)).getTime();

const DEVICE: string = "ansim01";
const TABLE: string = "oxygen";
const LIMIT: number = 10;

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
  TableName: TABLE,
};

const PAYLOAD_MAP = (items: any[]): void => {
  items.map((item: IQueryItem) => {
    const toFixedFunc = (value: string) => parseFloat(value).toFixed(2);
    try {
      const measure_time = item.Payload.M.measure_time.N;
      const oxygen_mpl_value = toFixedFunc(item.Payload.M.oxygen_mpl.M.value.N);
      const oxygen_mpl_unit = item.Payload.M.oxygen_mpl.M.unit.S;
      const oxygen_per_value = toFixedFunc(item.Payload.M.oxygen_per.M.value.N);
      const oxygen_per_unit = item.Payload.M.oxygen_per.M.unit.S;

      return console.log({
        measure_time: measure_time,
        oxygen_mpl: `${oxygen_mpl_value}${oxygen_mpl_unit}`,
        oxygen_per: `${oxygen_per_value}${oxygen_per_unit}`,
      });
    } catch (err) {
      return console.error(err);
    }
  });
};

const queryCommand = async (): Promise<void> => {
  const client: any = new DynamoDBClient({ region: REGION });
  const command: any = new QueryCommand({ ...INPUT_VALUES });

  try {
    const response: any = await client.send(command);
    PAYLOAD_MAP(response.Items);

    return console.log(
      "\n\n",
      {
        QueryCommand: {
          range: `${YESTERDAY} ~ ${TODAY}`,
          response: response,
        },
      },
      "\n\n"
    );
  } catch (err) {
    return console.error(err);
  }
};

queryCommand();
