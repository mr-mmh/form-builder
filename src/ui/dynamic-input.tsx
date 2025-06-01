"use client";

import { useCallback, useState } from "react";
import { FormFields, RenderForm, type DIRType } from "..";
import { Label } from "../ui/label";
import { StringOrElement } from "@/field/string-or-element";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

type DynamicInputProps<
    TVariants extends string,
    T extends { [key in TVariants]: { variant: key;[key: string]: any } },
> = {
    forms: {
        [key in TVariants]: FormFields<Omit<T[key], "variant">>;
    };
    defaultValue?: T[TVariants];
    startValues: { [key in TVariants]: Omit<T[key], "variant"> };
    disabled?: boolean;
    onChange?: (val: T[TVariants]) => void;
    className?: string;
    variantOpts?: {
        [key in TVariants]: {
            label: React.ReactNode;
        };
    };
    placeholder?: string;
    dir?: DIRType;
    selectLabel?: React.ReactNode;
};

function DynamicInput<
    TVariants extends string,
    T extends { [key in TVariants]: { variant: key;[key: string]: any } },
>({
    forms,
    defaultValue,
    disabled,
    onChange,
    className,
    variantOpts,
    startValues,
    placeholder = "kind",
    dir = "ltr",
    selectLabel = "kind",
}: DynamicInputProps<TVariants, T>) {
    const [val, setVal] = useState(defaultValue);
    const [variant, setVariant] = useState<TVariants | undefined>(
        defaultValue ? (defaultValue.variant as TVariants) : undefined,
    );
    const [sV] = useState(startValues);

    const handleChange = useCallback(
        (values: any, newVariant?: TVariants) => {
            const newVal = { ...values, variant: newVariant ?? variant };
            setVal(newVal);
            onChange?.(newVal);
        },
        [onChange, variant],
    );

    return (
        <div className={cn("flex w-full flex-col gap-2", className)}>
            {StringOrElement(selectLabel, ({ children }) => (
                <Label className="pb-1">{children}</Label>
            ))}
            <Select
                disabled={disabled}
                dir={dir}
                onValueChange={(v) => {
                    if (v) {
                        setVariant(v as TVariants);
                        handleChange({ ...sV[v as keyof typeof sV] }, v as TVariants);
                    } else {
                        setVariant(undefined);
                        setVal(undefined);
                    }
                }}
                defaultValue={variant}
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent dir={dir}>
                    {Object.keys(forms).map((k) => (
                        <SelectItem key={k} value={k}>
                            {variantOpts?.[k as TVariants].label ?? k}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {variant && val && (
                <RenderForm
                    readonly={disabled}
                    key={variant}
                    defaultValues={val as any}
                    formFields={forms[variant]}
                    onUpdate={({ newValues }) => handleChange(newValues)}
                    as={"div"}
                />
            )}
        </div>
    );
}

export default DynamicInput;
