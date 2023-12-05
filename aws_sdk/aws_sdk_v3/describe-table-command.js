const {
  DynamoDBClient,
  DescribeTableCommand,
} = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

const REGION = process.env.AWS_REGION;
const CURRENT_TIME = new Date();
const MS_Time = CURRENT_TIME.getTime();

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

describeTableCommand();
