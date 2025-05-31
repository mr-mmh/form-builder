import { createFieldComp, FieldComps } from "./_shared";
import { cn } from "@/lib/utils";
import { PasswordInput } from "@/ui/password-input";
import type { GenFieldType } from "./_shared";

type PasswordInputField = GenFieldType<
    "PasswordInput",
    {
        placeholder?: string;
        inputClassName?: string;
        labelClassName?: string;
        descriptionClassName?: string;
    }
>;
const PasswordInputFieldComp = createFieldComp<PasswordInputField>((props) => {
    const {
        field,
        schema: {
            label,
            description,
            placeholder,
            className,
            descriptionClassName,
            inputClassName,
            labelClassName,
            required,
        },
    } = props;

    return (
        <FieldComps.FieldWrapper className={cn("", className)}>
            <FieldComps.FieldLabel
                label={label}
                required={required}
                className={labelClassName}
            />
            <FieldComps.FieldControl>
                <PasswordInput
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

export { type PasswordInputField, PasswordInputFieldComp };
