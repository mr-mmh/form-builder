import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import { cn } from "@/lib/utils";
import { Textarea } from "@/ui/textarea";

type TextareaField = GenFieldType<
    "Textarea",
    {
        placeholder?: string;
        labelClassName?: string;
        descriptionClassName?: string;
        textareaClassName?: string;
    }
>;
const TextareaFieldComp = createFieldComp<TextareaField>((props) => {
    const {
        field,
        schema: {
            label,
            description,
            placeholder,
            className,
            descriptionClassName,
            labelClassName,
            textareaClassName,
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
                <Textarea
                    {...field}
                    placeholder={placeholder}
                    className={cn(textareaClassName)}
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

export { type TextareaField, TextareaFieldComp };
