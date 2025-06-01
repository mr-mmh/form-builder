import DynamicInput from "@/ui/custom/dynamic-input";
import { DIRType } from "@/form/types";
import type { FormFields } from "@/form/types";
import { GenFieldType } from "../types";
import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";

type DynamicInputField = GenFieldType<
    "DynamicInput",
    {
        labelClassName?: string;
        descriptionClassName?: string;
        placeholder?: string;
        forms: { [key: string]: FormFields<any> };
        startValues: { [key: string]: any };
        variantOpts?: { [key: string]: { label: React.ReactNode } };
        dir?: DIRType;
        selectLabel?: React.ReactNode;
    }
>;

const DynamicInputFieldComp = createFieldComp<DynamicInputField>((props) => {
    const {
        field,
        schema: {
            label,
            disabled,
            description,
            className,
            required,
            labelClassName,
            descriptionClassName,
            placeholder,
            forms,
            startValues,
            dir,
            variantOpts,
            selectLabel,
        },
    } = props;

    return (
        <FieldComps.FieldWrapper className={className}>
            <FieldComps.FieldLabel
                label={label}
                required={required}
                className={labelClassName}
            />
            <FieldComps.FieldControl>
                <DynamicInput
                    defaultValue={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                    className={className}
                    placeholder={placeholder}
                    forms={forms}
                    startValues={startValues}
                    dir={dir}
                    variantOpts={variantOpts}
                    selectLabel={selectLabel}
                />
            </FieldComps.FieldControl>
            <FieldComps.FieldDescription
                description={description}
                className={descriptionClassName}
            />
        </FieldComps.FieldWrapper>
    );
});

export { type DynamicInputField, DynamicInputFieldComp };
