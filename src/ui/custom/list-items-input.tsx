"use client";

import { useCallback, useState } from "react";
import { CirclePlus, Copy, Trash } from "lucide-react";
import { FormFields, RenderForm } from "../..";
import { Button } from "../button";
import { TooltipWrapper } from "../tootltip-wrapper";
import { cn } from "@/lib/utils";

type WithId<T> = T & { id: string };
type RenderItemLabelFn<T> = (args: {
    item: WithId<T>;
    index: number;
}) => React.ReactNode;

type ListItemsInputProps<T> = {
    fields: FormFields<T>;
    startValue: T;
    defaultValues?: T[];
    disabled?: boolean;
    onChange?: (items: T[]) => void;
    maxItems?: number;
    minItems?: number;
    itemClassName?: string;
    className?: string;
    renderItemLabel?: RenderItemLabelFn<T>;
};

function ListItemsInput<T = any>({
    fields,
    defaultValues,
    disabled,
    startValue,
    minItems = 0,
    maxItems,
    onChange,
    renderItemLabel,
    className,
    itemClassName,
}: ListItemsInputProps<T>) {
    const [sV] = useState(startValue);
    const generateItem = useCallback(
        (item: T = sV): WithId<T> => ({ ...item, id: crypto.randomUUID() }),
        [sV],
    );
    const [items, setItems] = useState<WithId<T>[]>(() => {
        const defaultValuesLength = defaultValues?.length;
        if (defaultValuesLength && defaultValuesLength >= minItems) {
            return defaultValues.map((it) => generateItem(it));
        }
        if (defaultValuesLength && defaultValuesLength < minItems) {
            return defaultValues
                .map((it) => generateItem(it))
                .concat(
                    Array.from({ length: minItems - defaultValuesLength }, () =>
                        generateItem(),
                    ),
                );
        }
        return Array.from({ length: minItems }, () => generateItem());
    });

    const checkMaxItems = useCallback(
        () => (maxItems ? items.length < maxItems : true),
        [items.length, maxItems],
    );

    const checkMinItems = useCallback(
        () => items.length > minItems,
        [items.length, minItems],
    );
    const updateItems = useCallback(
        (items: WithId<T>[]) => {
            setItems(items);
            if (onChange) {
                onChange(items);
            }
        },
        [onChange],
    );

    const addItem = useCallback(() => {
        if (!checkMaxItems()) return;
        updateItems([...items, generateItem()]);
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
            if (!checkMinItems()) return;
            updateItems(items.filter((it) => it.id !== id));
        },
        [checkMinItems, items, updateItems],
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
                    {!!renderItemLabel &&
                        renderItemLabel({ item: it, index: i })}
                    <RenderForm
                        defaultValues={it}
                        formFields={fields}
                        onUpdate={({ newValues }) =>
                            updateItem(it.id, newValues)
                        }
                        readonly={disabled}
                        as={"div"}
                    />
                    {!disabled && (
                        <div className="flex w-full items-center justify-end gap-2">
                            <TooltipWrapper content={"حذف آیتم"}>
                                <Button
                                    type="button"
                                    className="size-8"
                                    variant={"secondary"}
                                    onClick={() => removeItem(it.id)}
                                    disabled={!checkMinItems()}
                                >
                                    <Trash />
                                </Button>
                            </TooltipWrapper>
                            <TooltipWrapper content={"تکثیر آیتم"}>
                                <Button
                                    type="button"
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
                <TooltipWrapper content={"ایجاد آیتم جدید"}>
                    <Button
                        type="button"
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

export default ListItemsInput;
