export interface Field {
  id: number;
  label: string;
  type: string;
  placeholder?: string;
  validation: Validation;
  options?: string[];
}

export interface Validation {
  required: boolean;
  pattern?: string;
  matchField?: string;
  minAge?: number;
  minLength?: number;
  maxLength?: number;
  accept?: string[];
}
