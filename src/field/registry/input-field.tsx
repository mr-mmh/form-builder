import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import { cn } from "@/lib/utils";
import { DIRType } from "@/form/types";
import { Input } from "@/ui/input";

type InputField = GenFieldType<
    "Input",
    {
        placeholder?: string;
        inputClassName?: string;
        labelClassName?: string;
        descriptionClassName?: string;
        dir?: DIRType;
    }
>;
const InputFieldComp = createFieldComp<InputField>((props) => {
    const {
        field,
        schema: {
            label,
            description,
            placeholder,
            className,
            labelClassName,
            descriptionClassName,
            inputClassName,
            required,
            dir,
        },
    } = props;

    return (
        <FieldComps.FieldWrapper className={cn(className)}>
            <FieldComps.FieldLabel
                label={label}
                required={required}
                className={labelClassName}
            />
            <FieldComps.FieldControl>
                <Input
                    {...field}
                    placeholder={placeholder}
                    className={cn(inputClassName)}
                    dir={dir}
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

export { type InputField, InputFieldComp };
