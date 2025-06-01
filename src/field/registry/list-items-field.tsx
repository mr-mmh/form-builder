import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import { FormFields } from "@/form/types";
import { Badge } from "@/ui/badge";
import ListItemsInput from "@/ui/custom/list-items-input";

type ListItemsField = GenFieldType<
    "ListItems",
    {
        labelClassName?: string;
        descriptionClassName?: string;
        startValue: any;
        maxItems?: number;
        minItems?: number;
        itemClassName?: string;
        fields: FormFields<any>;
        itemLabelName?: string;
    }
>;

const ListItemsFieldComp = createFieldComp<ListItemsField>((props) => {
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
            fields,
            startValue,
            itemClassName,
            maxItems,
            minItems,
            itemLabelName = "item",
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
                <ListItemsInput
                    fields={fields}
                    startValue={startValue}
                    defaultValues={field.value}
                    onChange={(items) => field.onChange(items)}
                    disabled={disabled}
                    itemClassName={itemClassName}
                    maxItems={maxItems}
                    minItems={minItems}
                    renderItemLabel={({ index }) => (
                        <Badge
                            variant={"secondary"}
                            className="flex w-full items-center justify-center"
                        >
                            {itemLabelName} {index + 1}
                        </Badge>
                    )}
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

export { type ListItemsField, ListItemsFieldComp };
