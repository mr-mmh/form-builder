import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import SlugInput from "@/ui/custom/slug-input";

type SlugInputField = GenFieldType<
    "SlugInput",
    {
        labelClassName?: string;
        descriptionClassName?: string;
        inputClassName?: string;
        placeholder?: string;
        tooltipText?: string;
    }
>;

const SlugInputFieldComp = createFieldComp<SlugInputField>((props) => {
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
            inputClassName,
            placeholder,
            tooltipText,
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
                <SlugInput
                    defaultValue={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                    className={inputClassName}
                    canEdit={false}
                    placeholder={placeholder}
                    tooltip={tooltipText}
                />
            </FieldComps.FieldControl>
            <FieldComps.FieldDescription
                description={description}
                className={descriptionClassName}
            />
        </FieldComps.FieldWrapper>
    );
});

export { type SlugInputField, SlugInputFieldComp };
