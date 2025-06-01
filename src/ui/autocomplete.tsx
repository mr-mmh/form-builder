import React, {
    ChangeEvent,
    ComponentPropsWithoutRef,
    createContext,
    HTMLAttributes,
    MutableRefObject,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
// import Fuse from "fuse.js";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useToggle } from "./use-toggle";
import { cn } from "@/lib/utils";

type Items = string[];

type AutoCompeleteContextType = {
    items: Items;
    openSuggestion: boolean;
    toggleSuggestion: (open?: boolean) => void;
    selectedItems: Items;
    suggestions: Items | undefined;
    updateSuggestions: (values: Items | undefined) => void;
    addItem: (item: string) => void;
    removeItem: (item: string) => void;
    clearItems: () => void;
    INPUT: MutableRefObject<HTMLInputElement | null>;
    clearInput: () => void;
};
const AutoCompeleteContext = createContext<AutoCompeleteContextType | null>(
    null,
);

function useAutoCompelete() {
    const c = useContext(AutoCompeleteContext);
    if (!c) {
        throw new Error("AutoComplete must wrap in AutoCompelete component.");
    }
    return c;
}

async function getBestMatch(
    search: string,
    list: string[],
    threshold: number = 0.4,
): Promise<string[]> {
    const FUSE = (await import("fuse.js")).default;
    const fuse = new FUSE(list, {
        includeScore: true,
        threshold,
    });
    const results = fuse.search(search);
    return results.map((r) => r.item);
}

type DIVElementType = Omit<HTMLAttributes<HTMLDivElement>, "onChange">;
type AutoCompeleteProps = {
    items: Items;
    onChange?: (newState: string[]) => void;
    defaultValues?: string[];
    className?: string;
};

export function AutoCompelete({
    items,
    defaultValues,
    onChange,
    className,
    children,
    ...otherProps
}: PropsWithChildren<AutoCompeleteProps & DIVElementType>) {
    // const [its] = useState(items);
    const [suggestions, setSuggestions] = useState<Items | undefined>();
    const [openSuggestion, toggleSuggestion] = useToggle();
    const [selectedItems, setSelectedItems] = useState<Items>(
        defaultValues ?? [],
    );
    const INPUT = useRef<HTMLInputElement | null>(null);

    const updateSuggestions = useCallback(
        (values: Items | undefined) => setSuggestions(values),
        [],
    );

    const updateSelectedItems = useCallback(
        (newState: Items) => {
            setSelectedItems(newState);
            if (onChange) {
                onChange(newState);
            }
        },
        [onChange],
    );

    const addItem = useCallback(
        (item: string) => {
            if (selectedItems.includes(item)) return;
            updateSelectedItems([...selectedItems, item]);
        },
        [selectedItems, updateSelectedItems],
    );
    const removeItem = useCallback(
        (item: string) => {
            updateSelectedItems(selectedItems.filter((p) => p !== item));
        },
        [selectedItems, updateSelectedItems],
    );

    const clearItems = useCallback(
        () => updateSelectedItems([]),
        [updateSelectedItems],
    );
    const clearInput = useCallback(() => {
        if (INPUT.current) {
            INPUT.current.value = "";
        }
    }, []);

    return (
        <AutoCompeleteContext.Provider
            value={{
                openSuggestion,
                toggleSuggestion,
                selectedItems,
                suggestions,
                updateSuggestions,
                addItem,
                items,
                removeItem,
                clearItems,
                INPUT,
                clearInput,
            }}
        >
            <div className={cn("space-y-2", className)} {...otherProps}>
                {children}
            </div>
        </AutoCompeleteContext.Provider>
    );
}

export function AutoCompeleteInputArea({
    children,
    className,
    ...otherProps
}: PropsWithChildren<DIVElementType>) {
    return (
        <div className={cn("relative", className)} {...otherProps}>
            {children}
        </div>
    );
}

export function AutoCompeleteInput({
    className,
    placeholder,
    threshold = 0.4,
    freeAdd = false,
    ...otherProps
}: Omit<ComponentPropsWithoutRef<typeof Input>, "onChnage"> & {
    threshold?: number;
    freeAdd?: boolean;
}) {
    const {
        INPUT,
        toggleSuggestion,
        updateSuggestions,
        openSuggestion,
        items,
        addItem,
        clearInput,
    } = useAutoCompelete();

    const handleInputChange = useCallback(
        async (e: ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (!val && openSuggestion) {
                toggleSuggestion(false);
                updateSuggestions(undefined);
                return;
            }
            if (val) {
                const matches = await getBestMatch(val, items, threshold);
                if (!openSuggestion && matches.length) {
                    toggleSuggestion(true);
                    updateSuggestions(matches);
                } else if (openSuggestion && !matches.length) {
                    toggleSuggestion(false);
                    updateSuggestions(undefined);
                } else {
                    updateSuggestions(matches);
                }
            }
        },
        [openSuggestion, toggleSuggestion, updateSuggestions, items, threshold],
    );

    const addInputValue = useCallback(() => {
        if (INPUT.current?.value && !openSuggestion) {
            addItem(INPUT.current.value);
            clearInput();
        }
    }, [INPUT, addItem, clearInput, openSuggestion]);

    useEffect(() => {
        if (freeAdd) {
            const handleKeydown = (e: KeyboardEvent) => {
                if (e.key === "Enter") {
                    addInputValue();
                }
            };
            document.addEventListener("keydown", handleKeydown);
            return () => document.removeEventListener("keydown", handleKeydown);
        }
    }, [addInputValue, freeAdd]);

    return (
        <Input
            ref={INPUT}
            className={cn("z-0 h-10 w-full", className)}
            placeholder={placeholder}
            onChange={handleInputChange}
            {...otherProps}
        />
    );
}

export function AutoCompletePopover({
    align = "start",
    sideOffset = 2,
    autoFocus = false,
    className,
    children,
    ...otherProps
}: PropsWithChildren<ComponentPropsWithoutRef<typeof PopoverContent>>) {
    const { openSuggestion, INPUT, suggestions } = useAutoCompelete();

    return (
        <Popover open={openSuggestion} modal={false}>
            <PopoverTrigger
                className="absolute inset-0 -z-20 h-full w-full"
                asChild
                disabled
            >
                <Input className="w-full" disabled />
            </PopoverTrigger>
            <PopoverContent
                sideOffset={sideOffset}
                align={align}
                autoFocus={autoFocus}
                onFocus={() => INPUT.current?.focus()}
                className={cn("p-0", className)}
                {...otherProps}
            >
                {openSuggestion && suggestions && <>{children}</>}
            </PopoverContent>
        </Popover>
    );
}

export function AutoCompeleteSuggestions({
    className,
    liClassName,
    ulClassName,
    renderItem,
}: {
    className?: string;
    ulClassName?: string;
    liClassName?: string;
    renderItem?: (item: string) => JSX.Element;
}) {
    const {
        suggestions = [],
        addItem,
        toggleSuggestion,
        updateSuggestions,
        clearInput,
    } = useAutoCompelete();

    const length = suggestions.length;
    const [i, setI] = useState(0);
    const listRef = useRef<HTMLDivElement | null>(null);
    const itemsRefs = useRef<(HTMLLIElement | null)[]>([]);

    const handleSelect = useCallback(
        (item: string) => {
            addItem(item);
            toggleSuggestion(false);
            updateSuggestions(undefined);
            clearInput();
        },
        [addItem, clearInput, toggleSuggestion, updateSuggestions],
    );
    useEffect(() => {
        if (!length) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            if (key === "ArrowDown") {
                setI((prev) => {
                    const newI = prev + 1;
                    if (newI >= length) {
                        return 0;
                    }
                    return newI;
                });
            } else if (key === "ArrowUp") {
                setI((prev) => {
                    const newI = prev - 1;
                    if (newI < 0) {
                        return length - 1;
                    }
                    return newI;
                });
            } else if (key === "Enter" || key === "Tab") {
                handleSelect(suggestions[i]);
                e.preventDefault();
            } else if (key === "Escape") {
                toggleSuggestion(false);
            }
        };

        const handleClickOutside = (e: PointerEvent) => {
            if (
                listRef.current &&
                !listRef.current.contains(e.target as Node)
            ) {
                toggleSuggestion(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("pointerdown", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [handleSelect, i, length, suggestions, toggleSuggestion]);

    useEffect(() => {
        if (itemsRefs.current[i]) {
            itemsRefs.current[i]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [i]);

    if (!length) {
        return null;
    }

    return (
        <div ref={listRef} className={cn("flex size-full flex-col", className)}>
            <ul className={cn("max-h-60 overflow-auto border-b", ulClassName)}>
                {suggestions.map((it, index) => (
                    <li
                        key={it}
                        ref={(el) => {
                            itemsRefs.current[index] = el;
                        }}
                        className={cn(
                            "cursor-pointer px-2 py-1 first:rounded-t-md hover:bg-accent",
                            "data-[focused=true]:bg-accent",
                            liClassName,
                        )}
                        onClick={() => handleSelect(it)}
                        data-focused={index === i ? "true" : "false"}
                    >
                        {renderItem !== undefined ? renderItem(it) : <>{it}</>}
                    </li>
                ))}
            </ul>
            <Button
                onClick={() => toggleSuggestion(false)}
                size={"sm"}
                variant={"ghost"}
                className="flex w-full items-center justify-center gap-2"
            >
                <X className="size-4" />
                <span className="text-sm">بستن</span>
            </Button>
        </div>
    );
}

export function AutoCompeleteValuesArea({
    children,
    className,
    ...otherProps
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
    const { selectedItems } = useAutoCompelete();

    if (!selectedItems.length) {
        return null;
    }

    return (
        <div
            className={cn("flex w-full flex-1 flex-wrap gap-1", className)}
            {...otherProps}
        >
            {children}
        </div>
    );
}

export function AutoCompeleteValues({
    variant = "secondary",
    className,
    renderItem,
    ...otherProps
}: ComponentPropsWithoutRef<typeof Badge> & {
    renderItem?: (item: string) => JSX.Element;
}) {
    const { selectedItems, removeItem } = useAutoCompelete();
    const lastTap = useRef(0);
    const handleDoubleTap = useCallback(
        (item: string) => {
            const now = Date.now();
            const DOUBLE_TAP_DELAY = 300;
            if (now - lastTap.current < DOUBLE_TAP_DELAY) {
                removeItem(item);
            }
            lastTap.current = now;
        },
        [removeItem],
    );
    if (!selectedItems.length) return null;
    return (
        <>
            {selectedItems.map((it) => (
                <div
                    key={it}
                    onDoubleClick={() => removeItem(it)}
                    onTouchStart={() => handleDoubleTap(it)}
                >
                    {renderItem !== undefined ? (
                        <>{renderItem(it)}</>
                    ) : (
                        <Badge
                            {...otherProps}
                            variant={variant}
                            className={cn(
                                "flex items-center gap-2 hover:cursor-pointer",
                                className,
                            )}
                        >
                            <span>{it}</span>
                        </Badge>
                    )}
                </div>
            ))}
        </>
    );
}
