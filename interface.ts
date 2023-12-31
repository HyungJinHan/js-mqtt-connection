type TKeyConditions =
  | "EQ"
  | "LE"
  | "LT"
  | "GE"
  | "GT"
  | "BEGINS_WITH"
  | "BETWEEN";

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
  KeyConditions?: TKeyConditions;
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
      oxygen_mpl: {
        M: {
          value: { readonly N: string };
          unit: { readonly S: string };
        };
      };
      oxygen_per: {
        M: {
          value: { readonly N: string };
          unit: { readonly S: string };
        };
      };
      oxygen_ppm: {
        M: {
          value: { readonly N: string };
          unit: { readonly S: string };
        };
      };
      temperature: {
        M: {
          value: { readonly N: string };
          unit: { readonly S: string };
        };
      };
      coordinates: {
        M: {
          latitude: { readonly N: string };
          longitude: { readonly N: string };
        };
      };
    };
  };
  device_id: { readonly S: string }; // 파티션 키
  measure_time: { readonly N: string }; // 정렬 키
}

export interface IPayloadFunc {
  (items: any[]): void;
}

export interface IQueryFunc {
  (): Promise<void>;
}
