export enum FieldTypes {
  TEXT = "text",
  EMAIL = "email",
  NUMBER = "number",
  MULTILINE = "multiline",
  SELECT = "select",
}

export interface Data {
  fieldName: string;
  type: string;
  value: string | number;
  options?: string[] | number[];
}

export interface Response {
  success: boolean;
  message: string;
  data: Data;
}
