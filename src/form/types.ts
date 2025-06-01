import { ElementType } from "react";
import { EventType } from "react-hook-form";
import { Schema } from "zod";
import { GenFieldType } from "../field/types";
import type { AutocompleteInputField } from "../field/registry/autocomplete-field";
import type { CheckboxField } from "../field/registry/checkbox-field";
import type { ColorInputField } from "../field/registry/color-input-field";
import type { ComboboxField } from "../field/registry/combobox-field";
import type { DynamicInputField } from "../field/registry/dynamic-input-field";
import type { DynamicListItemsField } from "../field/registry/dynamic-list-items-field";
import type { InputField } from "../field/registry/input-field";
import type { ListItemsField } from "../field/registry/list-items-field";
import type { PasswordInputField } from "../field/registry/password-input-field";
import type { RadioGroupField } from "../field/registry/radio-field";
import type { SelectField } from "../field/registry/select-field";
import type { SliderField } from "../field/registry/slider-field";
import type { SlugInputField } from "../field/registry/slug-input-field";
import type { SwitchField } from "../field/registry/switch-field";
import type { TextareaField } from "../field/registry/textarea-field";

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
    | AutocompleteInputField
    | SlugInputField
    | ColorInputField
    | DynamicInputField
    | DynamicListItemsField
    | ListItemsField
    | ComboboxField
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

export type DIRType = "rtl" | "ltr";
