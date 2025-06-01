import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import { cn } from "@/lib/utils";
import { Switch } from "@/ui/switch";

type SwitchField = GenFieldType<
    "Switch",
    {
        labelClassName?: string;
        descriptionClassName?: string;
        switchClassName?: string;
        wrapperClassName?: string;
        convertor?: {
            falsy: any;
            truthy: any;
        };
    }
>;
const SwitchFieldComp = createFieldComp<SwitchField>((props) => {
    const {
        field,
        schema: {
            label,
            description,
            className,
            descriptionClassName,
            labelClassName,
            switchClassName,
            wrapperClassName,
            required,
            convertor,
            disabled,
        },
    } = props;

    return (
        <FieldComps.FieldWrapper
            className={cn(
                "flex flex-row items-center justify-between rounded-lg border p-4",
                className,
            )}
        >
            <div className={cn("space-y-0.5", wrapperClassName)}>
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
            <FieldComps.FieldControl>
                <Switch
                    disabled={disabled}
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
                    className={cn(switchClassName)}
                />
            </FieldComps.FieldControl>
            <FieldComps.FieldMessage />
        </FieldComps.FieldWrapper>
    );
});

export { type SwitchField, SwitchFieldComp };
