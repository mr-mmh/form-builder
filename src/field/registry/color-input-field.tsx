import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import ColorInput from "@/ui/custom/color-input";

type ColorInputField = GenFieldType<
    "ColorInput",
    {
        labelClassName?: string;
        descriptionClassName?: string;
    }
>;

const ColorInputFieldComp = createFieldComp<ColorInputField>((props) => {
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
                <ColorInput
                    defaultValue={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                    className={className}
                />
            </FieldComps.FieldControl>
            <FieldComps.FieldDescription
                description={description}
                className={descriptionClassName}
            />
            <FieldComps.FieldMessage />
        </FieldComps.FieldWrapper>
    );
});

export { type ColorInputField, ColorInputFieldComp };
