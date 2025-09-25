import type { Field } from "@/types";
import { normalizeLabel } from "./utils";

export function validator(field: Field, watch: any) {
  const validationsMap = new Map();

  if (field.validation.required) {
    validationsMap.set("required", "Este campo es obligatorio");
  }

  if (field.validation.pattern) {
    validationsMap.set("pattern", {
      value: new RegExp(field.validation.pattern),
      message: "Formato incorrecto",
    });
  }

  if (field.validation.matchField !== undefined) {
    validationsMap.set("validate", (value: string) => {
      if (watch(normalizeLabel(field.validation.matchField)) !== value) {
        return "Los campos no coinciden";
      }
    });
  }

  if (field.validation.minAge !== undefined) {
    validationsMap.set("validate", (value: string) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < field.validation.minAge && age > 0) {
        return `Debes tener al menos ${field.validation.minAge} años`;
      } else if (age > 120 || age < 0) {
        return "Por favor introduce una fecha válida";
      }
    });
  }

  if (field.validation.minLength !== undefined) {
    validationsMap.set("minLength", {
      value: field.validation.minLength,
      message: `El campo debe contener al menos ${field.validation.minLength} caracteres`,
    });
  }

  if (field.validation.maxLength !== undefined) {
    validationsMap.set("maxLength", {
      value: field.validation.maxLength,
      message: `El campo debe contener como máximo ${field.validation.maxLength} caracteres`,
    });
  }

  return Object.fromEntries(validationsMap);
}
