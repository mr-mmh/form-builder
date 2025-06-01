import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import { cn } from "@/lib/utils";
import * as Radio from "@/ui/radio-group";

type RadioGroupField = GenFieldType<
    "RadioGroup",
    {
        items: { value: string; label: string }[];
        labelClassName?: string;
        descriptionClassName?: string;
        itemClassName?: string;
        itemWrapperClassName?: string;
        groupClassName?: string;
    }
>;

const RadioGroupComp = createFieldComp<RadioGroupField>((props) => {
    const {
        schema: {
            items,
            className,
            description,
            label,
            descriptionClassName,
            labelClassName,
            itemClassName,
            itemWrapperClassName,
            groupClassName,
            required,
        },
        field,
    } = props;

    return (
        <FieldComps.FieldWrapper className={cn(className)}>
            <FieldComps.FieldLabel
                label={label}
                required={required}
                className={labelClassName}
            />
            <FieldComps.FieldControl>
                <Radio.RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className={cn("flex flex-col space-y-1", groupClassName)}
                >
                    {items.map((it) => (
                        <FieldComps.FieldWrapper
                            key={it.value}
                            className={cn(
                                "flex items-center space-x-3 space-y-0",
                                itemWrapperClassName,
                            )}
                        >
                            <FieldComps.FieldControl>
                                <Radio.RadioGroupItem
                                    value={it.value}
                                    className={cn(itemClassName)}
                                />
                            </FieldComps.FieldControl>
                            <FieldComps.FieldLabel label={it.label} />
                        </FieldComps.FieldWrapper>
                    ))}
                </Radio.RadioGroup>
            </FieldComps.FieldControl>
            <FieldComps.FieldDescription
                description={description}
                className={descriptionClassName}
            />
            <FieldComps.FieldMessage />
        </FieldComps.FieldWrapper>
    );
});

export { RadioGroupComp, type RadioGroupField };
