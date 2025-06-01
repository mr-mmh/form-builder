import { createFieldComp, FieldComps } from "./_shared";
import { cn } from "@/lib/utils";
import { Input } from "@/ui/input";
import type { GenFieldType } from "./_shared";

type InputField = GenFieldType<
    "Input",
    {
        placeholder?: string;
        inputClassName?: string;
        labelClassName?: string;
        descriptionClassName?: string;
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
