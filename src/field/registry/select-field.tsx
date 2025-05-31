import { createFieldComp, FieldComps } from "./_shared";
import { cn } from "@/lib/utils";
import * as Select from "@/ui/select";
import type { GenFieldType } from "./_shared";

type SelectField = GenFieldType<
    "Select",
    {
        items: { value: string; label?: string }[];
        placeholder?: string;
        labelClassName?: string;
        descriptionClassName?: string;
        triggerClassName?: string;
        contentClassName?: string;
        itemClassName?: string;
        dir?: "rtl" | "ltr";
    }
>;
const SelectFieldComp = createFieldComp<SelectField>((props) => {
    const {
        field,
        schema: {
            label,
            description,
            placeholder,
            items,
            className,
            descriptionClassName,
            labelClassName,
            triggerClassName,
            contentClassName,
            itemClassName,
            required,
            dir = "ltr",
        },
    } = props;

    return (
        <FieldComps.FieldWrapper className={cn(className)}>
            <FieldComps.FieldLabel
                label={label}
                required={required}
                className={labelClassName}
            />
            <Select.Select
                dir={dir}
                onValueChange={(val) => field.onChange(val)}
                defaultValue={field.value}
            >
                <FieldComps.FieldControl>
                    <Select.SelectTrigger className={cn(triggerClassName)}>
                        <Select.SelectValue placeholder={placeholder} />
                    </Select.SelectTrigger>
                </FieldComps.FieldControl>
                <Select.SelectContent
                    className={cn(contentClassName)}
                    dir={dir}
                >
                    {items.map((it, i) => (
                        <Select.SelectItem
                            dir={dir}
                            key={it.value + i}
                            value={it.value}
                            className={cn(itemClassName)}
                        >
                            {it.label ? it.label : it.value}
                        </Select.SelectItem>
                    ))}
                </Select.SelectContent>
            </Select.Select>
            <FieldComps.FieldDescription
                description={description}
                className={descriptionClassName}
            />
            <FieldComps.FieldMessage />
        </FieldComps.FieldWrapper>
    );
});

export { type SelectField, SelectFieldComp };
