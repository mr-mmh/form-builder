import { cn } from "@/lib/utils";
import { Checkbox } from "@/ui/checkbox";
import { GenFieldType } from "../types";
import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";

type CheckboxField = GenFieldType<
    "Checkbox",
    {
        checkboxClassName?: string;
        labelClassName?: string;
        descriptionClassName?: string;
        wrapperClassName?: string;
        convertor?: {
            falsy: any;
            truthy: any;
        };
    }
>;
const CheckboxFieldComp = createFieldComp<CheckboxField>((props) => {
    const {
        field,
        schema: {
            label,
            description,
            className,
            checkboxClassName,
            descriptionClassName,
            labelClassName,
            wrapperClassName,
            required,
            convertor,
        },
    } = props;

    return (
        <FieldComps.FieldWrapper
            className={cn(
                "flex flex-row items-start space-y-0 rounded-md border p-4",
                className,
            )}
        >
            <FieldComps.FieldControl>
                <Checkbox
                    checked={
                        convertor
                            ? field.value === convertor.truthy
                            : field.value
                    }
                    onCheckedChange={(checked) => {
                        if (convertor) {
                            field.onChange(
                                checked ? convertor.truthy : convertor.falsy,
                            );
                        } else {
                            field.onChange(checked);
                        }
                    }}
                    className={cn(checkboxClassName)}
                />
            </FieldComps.FieldControl>
            <div
                className={cn("ml-2 space-y-1 leading-none", wrapperClassName)}
            >
                <FieldComps.FieldLabel
                    label={label}
                    required={required}
                    className={labelClassName}
                />
                <FieldComps.FieldDescription
                    description={description}
                    className={descriptionClassName}
                />
            </div>
            <FieldComps.FieldMessage />
        </FieldComps.FieldWrapper>
    );
});

export { type CheckboxField, CheckboxFieldComp };
