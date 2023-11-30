const {
  DynamoDBClient,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

const REGION = process.env.AWS_REGION;
// const CURRENT_TIME = new Date();
// const MS_Time = CURRENT_TIME.getTime();

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

listTablesCommand();
