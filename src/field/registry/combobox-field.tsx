import { Check, ChevronsUpDown } from "lucide-react";
import { createFieldComp } from "../create-field-comp";
import * as FieldComps from "../field-comps";
import { GenFieldType } from "../types";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import * as Command from "@/ui/command";
import { FormControl } from "@/ui/form";
import * as Popover from "@/ui/popover";

type ComboboxField = GenFieldType<
    "Combobox",
    {
        btnPlaceholder?: string;
        searchPlaceholder?: string;
        emptyMsg?: string;
        items: { value: string | null; label?: string }[];
        labelClassName?: string;
        descriptionClassName?: string;
        triggerClassName?: string;
        searchClassName?: string;
        contentClassName?: string;
        itemClassName?: string;
    }
>;
const ComboboxFieldComp = createFieldComp<ComboboxField>((props) => {
    const {
        field,
        schema: {
            label,
            description,
            items,
            btnPlaceholder = "select",
            emptyMsg,
            searchPlaceholder = "search",
            className,
            descriptionClassName,
            labelClassName,
            contentClassName,
            searchClassName,
            triggerClassName,
            itemClassName,
            required,
        },
    } = props;

    const btnText = (fieldVal: any) => {
        if (fieldVal) {
            const selectedItem = items.find((it) => it.value === fieldVal);
            return selectedItem?.label ?? selectedItem?.value;
        }
        return btnPlaceholder;
    };

    return (
        <FieldComps.FieldWrapper className={cn("flex flex-col", className)}>
            <FieldComps.FieldLabel
                label={label}
                required={required}
                className={labelClassName}
            />
            <Popover.Popover>
                <Popover.PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            type="button"
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "justify-between",
                                field.value && "text-muted-foreground",
                                triggerClassName,
                            )}
                        >
                            {btnText(field.value)}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </Popover.PopoverTrigger>
                <Popover.PopoverContent
                    className={cn("w-full p-0", contentClassName)}
                >
                    <Command.Command>
                        <Command.CommandInput placeholder={searchPlaceholder} />
                        <Command.CommandList className={cn(searchClassName)}>
                            <Command.CommandEmpty>
                                {emptyMsg}
                            </Command.CommandEmpty>

                            <Command.CommandGroup>
                                {items.map((it) => (
                                    <Command.CommandItem
                                        className={cn(itemClassName)}
                                        key={it.label ?? it.value}
                                        onSelect={() =>
                                            field.onChange(it.value)
                                        }
                                    >
                                        {it.label ? it.label : it.value}
                                        <Check
                                            className={cn(
                                                "mr-auto",
                                                it.value === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />
                                    </Command.CommandItem>
                                ))}
                            </Command.CommandGroup>
                        </Command.CommandList>
                    </Command.Command>
                </Popover.PopoverContent>
            </Popover.Popover>
            <FieldComps.FieldDescription
                description={description}
                className={descriptionClassName}
            />
            <FieldComps.FieldMessage />
        </FieldComps.FieldWrapper>
    );
});

export { type ComboboxField, ComboboxFieldComp };
