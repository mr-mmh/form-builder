import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import { cn } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Slider } from "@/ui/slider";

type SliderField = GenFieldType<
    "Slider",
    {
        min: number;
        max: number;
        step?: number;
        updateOnCommit?: boolean;
        labelClassName?: string;
        descriptionClassName?: string;
        sliderClassName?: string;
        showValue?: boolean;
        valueUnit?: string;
        convertor?: (val: string) => string;
    }
>;
const SliderFieldComp = createFieldComp<SliderField>((props) => {
    const {
        field,
        schema: {
            label,
            description,
            max,
            min,
            step,
            updateOnCommit,
            className,
            descriptionClassName,
            labelClassName,
            sliderClassName,
            required,
            showValue,
            disabled,
            valueUnit,
            convertor,
        },
    } = props;

    const convertToStr = (val: number[]) => String(val[0]);
    const onChange = (
        val: number[],
        fieldOnChange: (...event: any[]) => void,
    ) => {
        if (convertor) {
            fieldOnChange(convertor(convertToStr(val)));
        } else {
            fieldOnChange(convertToStr(val));
        }
    };

    return (
        <FieldComps.FieldWrapper className={cn("", className)}>
            {showValue ? (
                <div className="flex w-full items-center justify-between py-1">
                    <FieldComps.FieldLabel
                        label={label}
                        required={required}
                        className={labelClassName}
                    />
                    <Badge variant={"secondary"} className="mr-2">
                        {valueUnit && <span>{valueUnit}</span>}
                        <span>{field.value}</span>
                    </Badge>
                </div>
            ) : (
                <FieldComps.FieldLabel
                    label={label}
                    required={required}
                    className={labelClassName}
                />
            )}

            <FieldComps.FieldControl>
                <Slider
                    disabled={disabled}
                    className={cn(sliderClassName)}
                    defaultValue={[Number(field.value)]}
                    min={Number(min)}
                    max={Number(max)}
                    step={step ? Number(step) : undefined}
                    onValueChange={
                        updateOnCommit
                            ? undefined
                            : (val) => onChange(val, field.onChange)
                    }
                    onValueCommit={
                        !updateOnCommit
                            ? undefined
                            : (val) => onChange(val, field.onChange)
                    }
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

export { type SliderField, SliderFieldComp };
