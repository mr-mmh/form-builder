import { ElementType } from "react";
import { EventType } from "react-hook-form";
import { Schema } from "zod";
import { GenFieldType } from "../field/types";
import type {
    CheckboxField,
    InputField,
    PasswordInputField,
    RadioGroupField,
    SelectField,
    SliderField,
    SwitchField,
    TextareaField,
} from "../field/registry";

export type SkipField = GenFieldType<"Skip", {}>;
export type FormFieldSchema =
    | InputField
    | TextareaField
    | PasswordInputField
    | SelectField
    | SliderField
    | SwitchField
    | CheckboxField
    | RadioGroupField
    | SkipField;

export type FormFields<T, TFields = FormFieldSchema> = {
    [K in keyof T]: TFields;
};
export type FormValues<T> = T;
export type FormCondition<T> = {
    [K in keyof T]?: (values: FormValues<T>) => boolean;
};

export type OnUpdateFn<T, K extends keyof T = keyof T> = (args: {
    newValues: FormValues<T>;
    info: {
        name?: K | undefined;
        type?: EventType;
        values?: Partial<FormValues<T>>;
    };
    updateField: (name: keyof T, val: T[K]) => void;
}) => void;

export type OnSubmitFn<T> = (newValues: FormValues<T>) => void;

export type RenderFormProps<T, TFormSchema, K extends keyof T = keyof T> = {
    formFields: FormFields<T, TFormSchema>;
    defaultValues: FormValues<T>;
    onUpdate?: OnUpdateFn<T, K>;
    onSubmit?: OnSubmitFn<T>;
    submitBtn?: React.ReactNode;
    condition?: FormCondition<T>;
    className?: string;
    schema?: Schema<NoInfer<T>>;
    readonly?: boolean;
    as?: ElementType<any, "form" | "div" | "section">;
};
