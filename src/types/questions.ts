export interface RadioInput {
  title: string;
  type: "radio";
  options: string[] | number[];
  value: string;
  disabled: boolean;
}

export interface TextareaInput {
  title: string;
  type: "textarea";
  placeholder: string;
  maxLength: number;
  value: string;
  disabled: boolean;
}

export interface SelectInput {
  title: string;
  type: "select";
  options: string[];
  value: string;
  disabled: boolean;
}

export interface TextInput {
  title: string;
  type: "text";
  placeholder: string;
  maxLength: number;
  value: string;
  disabled: boolean;
}

export type Questions = RadioInput | TextareaInput | SelectInput | TextInput;
