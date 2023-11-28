const {
  DynamoDBClient,
  ListTablesCommand,
  DynamoDB,
} = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

(async () => {
  const client = new DynamoDBClient({ region: process.env.AWS_REGION });
  const command = new ListTablesCommand({});
  try {
    const results = await client.send(command);
    console.log("ListTablesCommand ->", results);
  } catch (err) {
    console.error(err);
  }
})();

(async () => {
  const client = new DynamoDB({ region: process.env.AWS_REGION });
  try {
    const results = await client.listTables({});
    // console.log(results.TableNames.join("\n"));
    console.log("listTables (TableNames) ->", results.TableNames);
  } catch (err) {
    console.error(err);
  }
})();
