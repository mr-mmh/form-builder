import { FunctionComponent } from "react";
import type {
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    UseFormStateReturn,
} from "react-hook-form";

export type RenderComponentFn = () => React.ReactNode;
export type BaseFieldType = {
    kind: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    skip?: boolean;
    className?: string;
    required?: boolean;
    renderComponentBefore?: RenderComponentFn;
    renderComponentAfter?: RenderComponentFn;
};

export type GenFieldType<TKind extends string, TOther> = BaseFieldType & {
    kind: TKind;
} & TOther;

export type FieldContext = {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
};

export type FieldCompProps<T extends BaseFieldType> = {
    schema: T;
    name: string;
};

export type FieldComponent<T extends BaseFieldType> = FunctionComponent<
    FieldCompProps<T> & FieldContext
>;

export type FieldRegistry = { [key: string]: FieldComponent<any> };
