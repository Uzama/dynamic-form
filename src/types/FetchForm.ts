export enum FieldTypes {
  TEXT = "text",
  EMAIL = "email",
  NUMBER = "number",
  MULTILINE = "multiline",
  SELECT = "select",
}

export interface Field {
  fieldName: string;
  type: string;
  value: string | number | undefined;
  options?: string[] | number[];
}

export interface Response {
  success: boolean;
  message: string;
  data: Field[];
}
