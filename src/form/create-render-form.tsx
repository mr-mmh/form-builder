"use client";

import { useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RenderField } from "../field/render-field";
import { BaseFieldType, FieldRegistry } from "../field/types";
import {
    FormFields,
    FormFieldSchema,
    FormValues,
    RenderFormProps,
} from "./types";
import { cn } from "@/lib/utils";
import { Form as ShadcnForm } from "@/ui/form";

export function createRenderForm<
    TFormSchema extends BaseFieldType = FormFieldSchema,
>(fieldRegistryFn: () => FieldRegistry) {
    const fieldRegistry = fieldRegistryFn();
    return function RenderForm<T, K extends keyof T>({
        formFields,
        defaultValues,
        onSubmit,
        onUpdate,
        submitBtn,
        condition,
        className,
        schema,
        readonly,
        as: El = "form",
    }: RenderFormProps<T, TFormSchema>) {
        // TODO: implement other configs and settings for hook-form package
        const form = useForm({
            defaultValues: defaultValues as any,
            ...(schema && { resolver: zodResolver(schema as any) }),
        });

        const _onSubmit = useCallback(
            (values: FormValues<T>) => {
                if (onSubmit) {
                    onSubmit(values);
                }
            },
            [onSubmit],
        );
        const convertToRedonly = useCallback(
            (formFields: FormFields<T, TFormSchema>) => {
                const ff = { ...formFields };
                for (const key in ff) {
                    ff[key].disabled = true;
                }
                return ff;
            },
            [],
        );

        const ff = readonly ? convertToRedonly(formFields) : formFields;
        const updateField = useCallback(
            <K extends keyof T>(name: K, val: T[K]) => {
                form.setValue(name as string, val);
            },
            [form],
        );

        const { watch } = form;
        useEffect(() => {
            if (!onUpdate) return;
            const { unsubscribe } = watch((value, info) =>
                onUpdate({ newValues: value, info: info as any, updateField }),
            );
            return () => unsubscribe();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [onUpdate, updateField]);

        return (
            <ShadcnForm key={String(readonly)} {...form}>
                <El
                    onSubmit={
                        El === "form"
                            ? form.handleSubmit(_onSubmit as any)
                            : undefined
                    }
                    className={cn("space-y-4", className)}
                >
                    {Object.keys(ff).map((k, i) => {
                        if (
                            condition &&
                            condition[k as K]?.(form.getValues()) === false
                        ) {
                            return null;
                        }
                        const field = formFields[k as K];
                        if (field.kind === "Skip") {
                            return null;
                        }
                        const Comp = fieldRegistry[field.kind];
                        if (!Comp) {
                            throw new Error(
                                `Component for field ${field.kind} not found in registry. please register this field.`,
                            );
                        }
                        return (
                            <RenderField
                                key={k + i}
                                name={k}
                                schema={field}
                                Comp={fieldRegistry[field.kind]}
                            />
                        );
                    })}
                    {!readonly && submitBtn}
                </El>
            </ShadcnForm>
        );
    };
}
