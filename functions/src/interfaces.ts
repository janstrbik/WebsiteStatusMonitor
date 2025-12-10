import { eCodeLanguage, eSensorType, eValueType } from "./enums";

export interface LogmillSensor {
  SensorName?: string;
  SensorType?: eSensorType;
  Environment?: string;
  Language?: eCodeLanguage;
  Version?: string;
  DateCreated?: string;
  Values?: {
    [key: string]: {
      Value?: string;
      ValueType?: eValueType;
      IsImportant?: boolean;
    };
  };
}
