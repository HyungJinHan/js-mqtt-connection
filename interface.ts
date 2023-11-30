export interface IQueryInput {
  ExpressionAttributeNames: {
    "#id": string;
    "#time": string;
  };
  ExpressionAttributeValues: {
    ":device": {
      S: string;
    };
    ":yesterday": {
      N: string;
    };
    ":today": {
      N: string;
    };
  };
  KeyConditionExpression: string;
  ScanIndexForward: boolean;
  Limit: number;
  TableName: string;
}

export interface IQueryItem {
  Payload: {
    M: {
      measure_time: { N: string };
      oxygen_mpl: { M: { value: { N: string }; unit: { S: string } } };
    };
  };
  device_id: { S: string };
  measure_time: { N: string };
}
