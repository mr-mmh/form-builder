"use client";

import { useCallback, useState } from "react";
import { CirclePlus, Copy, Trash } from "lucide-react";
import { FormFields, type DIRType } from "..";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import DynamicInput from "./dynamic-input";
import { cn } from "@/lib/utils";
import { TooltipWrapper } from "./tootltip-wrapper";

type DynamicListItemsInputProps<
    TVariants extends string,
    T extends { [key in TVariants]: { variant: key;[key: string]: any } },
> = {
    forms: {
        [key in TVariants]: FormFields<Omit<T[key], "variant">>;
    };
    defaultValues?: T[TVariants][];
    startValues: { [key in TVariants]: Omit<T[key], "variant"> };
    onChange?: (values: T[TVariants][]) => void;
    variantOpts?: {
        [key in TVariants]: {
            label: React.ReactNode;
            placeholder?: string;
            selectLabel?: React.ReactNode;
        };
    };
    disabled?: boolean;
    className?: string;
    itemClassName?: string;
    dir?: DIRType;
    maxItems?: number;
    itemLabelName?: string;
    removeItemTooltipText?: string;
    duplicateItemTooltipText?: string;
    addItemTooltipText?: string;
};

function DynamicListItemsInput<
    TVariants extends string,
    T extends { [key in TVariants]: { variant: key;[key: string]: any } },
>({
    forms,
    startValues,
    className,
    defaultValues,
    dir,
    disabled,
    maxItems,
    onChange,
    itemClassName,
    variantOpts,
    itemLabelName = "item",
    removeItemTooltipText = "remove item",
    duplicateItemTooltipText = "duplicate item",
    addItemTooltipText = "add item",
}: DynamicListItemsInputProps<TVariants, T>) {
    const generateItem = useCallback(
        (item: any) => ({ ...item, id: crypto.randomUUID() }),
        [],
    );
    const [items, setItems] = useState<any[]>(
        defaultValues?.map((dv) => generateItem(dv)) ?? [],
    );

    const checkMaxItems = useCallback(
        () => (maxItems ? items.length < maxItems : true),
        [items.length, maxItems],
    );
    const updateItems = useCallback(
        (items: any[]) => {
            setItems(items);
            if (onChange) {
                onChange(
                    items.filter((it) => it.variant && it.variant.length > 0),
                );
            }
        },
        [onChange],
    );
    const addItem = useCallback(() => {
        if (!checkMaxItems()) return;
        updateItems([...items, generateItem({ variant: "" })]);
    }, [checkMaxItems, generateItem, items, updateItems]);

    const copyItem = useCallback(
        (id: string) => {
            if (!checkMaxItems()) return;
            const index = items.findIndex((it) => it.id === id);
            if (index === -1) return;
            const newItems = [...items];
            newItems.splice(index + 1, 0, generateItem(items[index]));
            updateItems(newItems);
        },
        [checkMaxItems, generateItem, items, updateItems],
    );
    const removeItem = useCallback(
        (id: string) => {
            updateItems(items.filter((it) => it.id !== id));
        },
        [items, updateItems],
    );

    const updateItem = useCallback(
        (id: string, newValues: any) =>
            updateItems(
                items.map((it) => {
                    if (it.id === id) {
                        return { ...it, ...newValues };
                    }
                    return it;
                }),
            ),
        [items, updateItems],
    );

    return (
        <div className={cn("flex w-full flex-col gap-2", className)}>
            {items.map((it, i) => (
                <div
                    key={it.id}
                    className={cn(
                        "flex w-full flex-col gap-2 py-2",
                        itemClassName,
                    )}
                >
                    <Badge
                        variant={"secondary"}
                        className="mb-1 flex w-full items-center justify-center gap-1"
                    >
                        {itemLabelName} {i + 1}
                    </Badge>
                    <DynamicInput
                        forms={forms}
                        startValues={startValues}
                        dir={dir}
                        onChange={(val) => updateItem(it.id, val)}
                        defaultValue={it}
                        disabled={disabled}
                        placeholder={
                            it.variant && it.variant.length
                                ? variantOpts?.[it.variant as TVariants]
                                    ?.placeholder
                                : "انتخاب کنید"
                        }
                        selectLabel={
                            it.variant && it.variant.length
                                ? variantOpts?.[it.variant as TVariants]?.label
                                : "نوع"
                        }
                        variantOpts={variantOpts}
                    />
                    {!disabled && (
                        <div className="flex w-full items-center justify-end gap-2">
                            <TooltipWrapper content={removeItemTooltipText}>
                                <Button
                                    className="size-8"
                                    variant={"secondary"}
                                    onClick={() => removeItem(it.id)}
                                >
                                    <Trash />
                                </Button>
                            </TooltipWrapper>
                            <TooltipWrapper content={duplicateItemTooltipText}>
                                <Button
                                    className="size-8"
                                    variant={"secondary"}
                                    onClick={() => copyItem(it.id)}
                                    disabled={!checkMaxItems()}
                                >
                                    <Copy />
                                </Button>
                            </TooltipWrapper>
                        </div>
                    )}
                </div>
            ))}
            {checkMaxItems() && !disabled && (
                <TooltipWrapper content={addItemTooltipText}>
                    <Button
                        className="w-full"
                        variant={"secondary"}
                        onClick={addItem}
                        disabled={disabled}
                    >
                        <CirclePlus />
                    </Button>
                </TooltipWrapper>
            )}
        </div>
    );
}

export default DynamicListItemsInput;
