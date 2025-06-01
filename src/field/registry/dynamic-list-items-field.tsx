import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import { DIRType, FormFields } from "@/form/types";
import DynamicListItemsInput from "@/ui/custom/dynamic-list-items-input";

type DynamicListItemsField = GenFieldType<
    "DynamicListItems",
    {
        labelClassName?: string;
        descriptionClassName?: string;
        forms: { [key: string]: FormFields<any> };
        startValues: { [key: string]: any };
        variantOpts?: {
            [key: string]: {
                label: React.ReactNode;
                placeholder?: string;
                selectLabel?: React.ReactNode;
            };
        };
        dir?: DIRType;
        itemLabelName?: string;
        maxItems?: number;
        itemClassName?: string;
    }
>;

const DynamicListItemsFieldComp = createFieldComp<DynamicListItemsField>(
    (props) => {
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
                forms,
                startValues,
                dir,
                variantOpts,
                itemClassName,
                itemLabelName,
                maxItems,
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
                    <DynamicListItemsInput
                        defaultValues={field.value}
                        onChange={field.onChange}
                        disabled={disabled}
                        forms={forms}
                        startValues={startValues}
                        dir={dir}
                        variantOpts={variantOpts}
                        itemClassName={itemClassName}
                        itemLabelName={itemLabelName}
                        maxItems={maxItems}
                    />
                </FieldComps.FieldControl>
                <FieldComps.FieldDescription
                    description={description}
                    className={descriptionClassName}
                />
            </FieldComps.FieldWrapper>
        );
    },
);

export { type DynamicListItemsField, DynamicListItemsFieldComp };
