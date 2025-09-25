"use client";
import fields from "@/db/questions.json";

import type { Key } from "react";
import type { Field } from "@/types";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { normalizeLabel } from "@/lib/utils";
import { validator } from "@/lib/validator";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export function Form() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: any) => {
    toast.success("Formulario enviado con éxito!");
    setData(data);
    redirect("#result");
  };

  let hasShownPasswordTips = false;

  useEffect(() => {});

  const renderFormField = (key: Key, field: Field) => {
    const name = normalizeLabel(field.label);
    const showPasswordTips = field.type === "password" && !hasShownPasswordTips;
    if (showPasswordTips) hasShownPasswordTips = true;

    switch (field.type) {
      case "select":
        return (
          <div
            key={key}
            className={`${errors[name] && "bg-red-100"} rounded-2xl px-4 py-2 relative overflow-hidden transition-colors`}
          >
            <label>
              {field.label}
              {field.validation.required && "*"}
              <select
                {...register(name, validator(field, watch))}
                className="bg-neutral-100 border-black/20 border w-full p-2 rounded-xl"
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-sm text-red-600">
              {errors[name] && errors[name]?.message?.toString()}
            </p>{" "}
            <div
              className={`${errors[name] ? "left-0 " : "-left-2"} absolute top-0 h-full w-2 bg-red-500 transition-all`}
            />
          </div>
        );
      case "checkbox":
        return (
          <div
            key={key}
            className={`${errors[name] && "bg-red-100"} rounded-2xl px-4 py-2 relative overflow-hidden transition-colors`}
          >
            <label>
              <input
                type="checkbox"
                {...register(name, validator(field, watch))}
              />
              <span className="ml-2">
                {field.label}
                {field.validation.required && "*"}
              </span>
            </label>
            <p className="text-sm text-red-600">
              {errors[name] && errors[name]?.message?.toString()}
            </p>{" "}
            <div
              className={`${errors[name] ? "left-0 " : "-left-2"} absolute top-0 h-full w-2 bg-red-500 transition-all`}
            />
          </div>
        );
      case "radio":
        return (
          <div
            key={key}
            className={`${errors[name] && "bg-red-100"} rounded-2xl px-4 py-2 relative overflow-hidden transition-colors`}
          >
            <fieldset>
              <legend>
                {field.label}
                {field.validation.required && "*"}
              </legend>
              {field.options?.map((option) => (
                <div key={option}>
                  <label>
                    <input
                      type="radio"
                      {...register(name, validator(field, watch))}
                      value={option}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </div>
              ))}
              <p className="text-sm text-red-600">
                {errors[name] && errors[name]?.message?.toString()}
              </p>
            </fieldset>
            <div
              className={`${errors[name] ? "left-0 " : "-left-2"} absolute top-0 h-full w-2 bg-red-500 transition-all`}
            />
          </div>
        );
      case "file":
        return (
          <div
            key={key}
            className={`${errors[name] && "bg-red-100"} rounded-2xl px-4 py-2 relative overflow-hidden transition-colors`}
          >
            <label>
              <span>
                {field.label}
                {field.validation.required && "*"}
              </span>
              <input
                className="bg-neutral-100 border-black/20 border w-full p-2 rounded-xl"
                type={field.type}
                accept={
                  field.validation.accept !== undefined
                    ? field.validation.accept?.join(",")
                    : "*"
                }
                {...register(name, validator(field, watch))}
              />
            </label>
            <p className="text-sm text-red-600">
              {errors[name] && errors[name]?.message?.toString()}
            </p>
            <div
              className={`${errors[name] ? "left-0 " : "-left-2"} absolute top-0 h-full w-2 bg-red-500 transition-all`}
            />
          </div>
        );
      case "password":
        return (
          <div
            key={key}
            className={`${errors[name] && "bg-red-100"} rounded-2xl px-4 py-2 relative overflow-hidden transition-colors`}
          >
            <label>
              <span>
                {field.label}
                {field.validation.required && "*"}
              </span>
              <input
                className="bg-neutral-100 border-black/20 border w-full p-2 rounded-xl"
                type={field.type}
                {...register(name, validator(field, watch))}
                onChange={(e) => {
                  register(name, validator(field, watch)).onChange(e);
                  if (showPasswordTips) setPassword(e.target.value);
                }}
              />
            </label>

            {showPasswordTips && (
              <ul className="my-1">
                {field.validation.minLength !== undefined && (
                  <li className="text-xs text-neutral-500 flex items-center gap-1">
                    <div
                      className={`${password.length >= field.validation.minLength ? "border border-green-700 bg-green-700" : "border"} transition-colors rounded-full w-2 h-2`}
                    ></div>
                    Mínimo {field.validation.minLength} caracteres
                  </li>
                )}
                {field.validation.pattern?.includes("(?=.*[a-z])") && (
                  <li className="text-xs text-neutral-500 flex items-center gap-1">
                    <div
                      className={`${password.match(/[a-z]/) ? "border border-green-700 bg-green-700" : "border"} transition-colors rounded-full w-2 h-2`}
                    ></div>
                    Al menos una letra minúscula
                  </li>
                )}
                {field.validation.pattern?.includes("(?=.*[A-Z])") && (
                  <li className="text-xs text-neutral-500 flex items-center gap-1">
                    <div
                      className={`${password.match(/[A-Z]/) ? "border border-green-700 bg-green-700" : "border"} transition-colors rounded-full w-2 h-2`}
                    ></div>
                    Al menos una letra mayúscula
                  </li>
                )}
                {field.validation.pattern?.includes("(?=.*\\d)") && (
                  <li className="text-xs text-neutral-500 flex items-center gap-1">
                    <div
                      className={`${password.match(/\d/) ? "border border-green-700 bg-green-700" : "border"} transition-colors rounded-full w-2 h-2`}
                    ></div>
                    Al menos un número
                  </li>
                )}
                {field.validation.pattern?.includes("(?=.*[@$!%*?&])") && (
                  <li className="text-xs text-neutral-500 flex items-center gap-1">
                    <div
                      className={`${password.match(/[@$!%*?&]/) && !password.match(/[#^.,/'"]/) ? "border border-green-700 bg-green-700" : "border"} transition-colors rounded-full w-2 h-2`}
                    ></div>
                    Al menos un carácter especial (@$!%*?&)
                  </li>
                )}
              </ul>
            )}

            <p className="text-sm text-red-600">
              {errors[name] && errors[name]?.message?.toString()}
            </p>

            <div
              className={`${errors[name] ? "left-0 " : "-left-2"} absolute top-0 h-full w-2 bg-red-500 transition-all`}
            />
          </div>
        );
      default:
        return (
          <div
            key={key}
            className={`${errors[name] && "bg-red-100"} rounded-2xl px-4 py-2 relative overflow-hidden transition-colors`}
          >
            <label>
              <span>
                {field.label}
                {field.validation.required && "*"}
              </span>
              <input
                className="bg-neutral-100 border-black/20 border w-full p-2 rounded-xl"
                type={field.type}
                {...register(name, validator(field, watch))}
              />
            </label>
            <p className="text-sm text-red-600">
              {errors[name] && errors[name]?.message?.toString()}
            </p>

            <div
              className={`${errors[name] ? "left-0 " : "-left-2"} absolute top-0 h-full w-2 bg-red-500 transition-all`}
            />
          </div>
        );
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border border-black/20 shadow-lg p-2 sm:p-8 rounded-3xl bg-white"
      >
        {Object.entries(fields).map(([key, field]) =>
          renderFormField(key, field),
        )}
        <button
          type="submit"
          className="h-12 font-medium cursor-pointer bg-[#171e6b] text-white rounded-2xl hover:bg-[#2c3a9e] transition-all active:scale-[98%]"
        >
          Enviar formulario
        </button>
        <small>* Campo obligatorio</small>
      </form>
      {data && (
        <div className="mt-8" id="result">
          <h2 className="text-xl font-medium mb-4">Datos enviados:</h2>
          {Object.entries(data).map(([key, value]) => (
            <p key={key}>
              <span className="font-medium">{key}</span>: {String(value)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
