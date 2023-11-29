const {
  DynamoDBClient,
  ListTablesCommand,
  DynamoDB,
  DescribeTableCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

const REGION = process.env.AWS_REGION;

const listTablesCommand = async () => {
  const client = new DynamoDBClient({ region: REGION });
  const command = new ListTablesCommand({});

  try {
    const results = await client.send(command);
    return console.log({ ListTablesCommand: results }, "\n\n");
  } catch (err) {
    return console.error(err);
  }
};

const listTable = async () => {
  const client = new DynamoDB({ region: REGION });

  try {
    const results = await client.listTables({});
    return console.log(
      { "listTables (TableNames)": results.TableNames },
      "\n\n"
    );
  } catch (err) {
    return console.error(err);
  }
};

const describeTableCommand = async () => {
  const client = new DynamoDBClient({ region: REGION });
  const input = {
    TableName: "oxygen",
  };
  const command = new DescribeTableCommand(input);

  try {
    const response = await client.send(command);
    return console.log(
      {
        "DescribeTableCommand (oxygen)": response.Table,
        "DescribeTableCommand KeySchema (oxygen)": response.Table.KeySchema,
        "DescribeTableCommand AttributeDefinitions (oxygen)":
          response.Table.AttributeDefinitions,
      },
      "\n\n"
    );
  } catch (err) {
    return console.error(err);
  }
};

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
        N: "1701222628347",
      },
    },
    FilterExpression: "#n0 = :v0 AND #n1 = :v1",
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

listTablesCommand();
listTable();
describeTableCommand();
scanCommand();
