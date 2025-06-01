import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import AutocompleteInput from "@/ui/custom/autocomplete-input";

type AutocompleteInputField = GenFieldType<
    "AutocompleteInput",
    {
        labelClassName?: string;
        descriptionClassName?: string;
        inputClassName?: string;
        placeholder?: string;
        items: string[];
        threshold?: number;
        closeBtnText?: string;
    }
>;

const AutocompleteInputFieldComp = createFieldComp<AutocompleteInputField>(
    (props) => {
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
                items,
                threshold,
                closeBtnText,
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
                    <AutocompleteInput
                        defaultValue={field.value}
                        onChange={field.onChange}
                        disabled={disabled}
                        placeholder={placeholder}
                        items={items}
                        threshold={threshold}
                        closeBtnText={closeBtnText}
                    />
                </FieldComps.FieldControl>
                <FieldComps.FieldDescription
                    description={description}
                    className={descriptionClassName}
                />
            </FieldComps.FieldWrapper>
        );
    },
);

export { type AutocompleteInputField, AutocompleteInputFieldComp };
