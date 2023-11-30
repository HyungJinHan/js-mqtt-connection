export interface IQueryInput {
  ExpressionAttributeNames?: {
    "#id": string;
    "#time": string;
  };
  ExpressionAttributeValues?: {
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
  ConditionalOperator?: {
    readonly AND: string;
    readonly OR: string;
  };
  ExclusiveStartKey?: {
    B?: string;
    BOOL?: boolean;
    BS?: string[];
    L?: string;
    M?: {};
    N?: string;
    NS?: string[];
    NULL?: boolean;
    S?: string;
    SS?: string[];
  };
  KeyConditions?: {
    EQ?: string;
    LE?: string;
    LT?: string;
    GE?: string;
    GT?: string;
    BEGINS_WITH?: string;
    BETWEEN?: string;
  };
  KeyConditionExpression?: string;
  ScanIndexForward?: boolean;
  Limit?: number;
  TableName?: string;
  AttributesToGet?: string[];
  ConsistentRead?: boolean;
  IndexName?: string;
  ProjectionExpression?: string;
}

export interface IQueryItem {
  Payload: {
    M: {
      measure_time: { N: string };
      oxygen_mpl: { M: { value: { N: string }; unit: { S: string } } };
      oxygen_per: { M: { value: { N: string }; unit: { S: string } } };
      oxygen_ppm: { M: { value: { N: string }; unit: { S: string } } };
      temperature: { M: { value: { N: string }; unit: { S: string } } };
      coordinates: { M: { latitude: { N: string }; longitude: { N: string } } };
    };
  };
  device_id: { S: string };
  measure_time: { N: string };
}
