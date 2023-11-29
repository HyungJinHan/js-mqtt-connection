const {
  DynamoDBClient,
  ListTablesCommand,
  DynamoDB,
  DescribeTableCommand,
} = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

(async () => {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION });
  const command = new ListTablesCommand({});

  try {
    const results = await client.send(command);

    console.log("ListTablesCommand ->", results);
    console.log("");
    console.log("-----------------------------");
    console.log("");
  } catch (err) {
    console.error(err);
  }
})();

(async () => {
  const client = new DynamoDB({ region: process.env.AWS_REGION });

  try {
    const results = await client.listTables({});

    console.log("listTables (TableNames) ->", results.TableNames);
    console.log("");
    console.log("-----------------------------");
    console.log("");
  } catch (err) {
    console.error(err);
  }
})();

(async () => {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION });
  const input = {
    TableName: "oxygen",
  };
  const command = new DescribeTableCommand(input);

  try {
    const response = await client.send(command);

    console.log("DescribeTableCommand (oxygen) ->", response.Table);
    console.log("");
    console.log("-----------------------------");
    console.log("");
  } catch (err) {
    console.error(err);
  }
})();
