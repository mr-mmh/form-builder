import React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";

type ValueT = string | undefined | null;
type ToggleSelectProps = {
    children: React.ReactNode;
    selectedValue: ValueT;
    onSelect: (value: ValueT) => void;
    disabled?: boolean;
};

type ToggleSelectContextT = {
    selectedValue: ValueT;
    select: (value: ValueT, show: React.ReactNode | null) => void;
    values?: Record<string, React.ReactNode>;
    disabled?: boolean;
};

const ToggleSelectContext = React.createContext<ToggleSelectContextT | null>(
    null,
);

function getRecordValues(children: React.ReactNode) {
    if (children && React.Children.toArray(children)[1]) {
        const childArray = (
            React.Children.toArray(children)[1] as React.ReactElement<{
                children: React.ReactNode[];
            }>
        ).props.children;

        const ans: Record<string, React.ReactNode> = {};
        if (childArray && Array.isArray(childArray)) {
            childArray.forEach((child: any) => {
                if (child.type === React.Fragment) {
                    child.props.children.forEach((c: any) => {
                        if (c.props) {
                            ans[c.props.value] =
                                c.props.showText ?? c.props.children;
                        }
                    });
                } else {
                    ans[child.props.value] =
                        child.props.showText ?? child.props.children;
                }
            });
        }
        return ans;
    }
}

function useToggleSelectContext() {
    const context = React.useContext(ToggleSelectContext);
    if (!context) {
        throw new Error(
            "ToggleSelect components must be used within a ToggleSelect",
        );
    }
    return context;
}

export const ToggleSelect = ({
    children,
    selectedValue,
    onSelect,
    disabled,
}: ToggleSelectProps) => {
    const select = React.useCallback(
        (value: ValueT) => {
            if (onSelect) {
                onSelect(value);
            }
        },
        [onSelect],
    );

    return (
        <ToggleSelectContext.Provider
            value={{
                selectedValue,
                select,
                values: getRecordValues(children),
                disabled,
            }}
        >
            <Popover modal>{children}</Popover>
        </ToggleSelectContext.Provider>
    );
};
export const ToggleSelectTrigger = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const { values, selectedValue, disabled } = useToggleSelectContext();
    return (
        <PopoverTrigger disabled={disabled} asChild className="">
            <Button
                disabled={disabled}
                variant="outlineNoHover"
                className={cn(
                    "w-72 items-center justify-between px-2 font-normal",
                    className,
                )}
            >
                {selectedValue ? values?.[selectedValue] : children}
                <ChevronsUpDownIcon className="size-4 opacity-50" />
            </Button>
        </PopoverTrigger>
    );
};
export const ToggleSelectContent = ({
    children,
    className,
    ifEmpty,
}: {
    children: React.ReactNode;
    className?: string;
    ifEmpty?: React.ReactNode;
}) => {
    const isEmpty = React.Children.toArray(children).length === 0;
    return (
        <PopoverContent className={cn("flex flex-col gap-1 p-1", className)}>
            {children}
            {isEmpty && ifEmpty && <>{ifEmpty}</>}
        </PopoverContent>
    );
};

export const ToggleSelectItem = ({
    children,
    endContent,
    value,
    showText,
    className,
}: {
    children: React.ReactNode;
    value: string;
    showText?: string;
    endContent?: React.ReactNode;
    className?: string;
}) => {
    const { selectedValue, select } = useToggleSelectContext();
    const isSelected = selectedValue === value;
    return (
        <div
            onClick={() => {
                if (isSelected) {
                    select(null, null);
                } else {
                    select(value, showText ?? children);
                }
            }}
            data-selected={isSelected}
            className={cn(
                "flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent data-[selected=true]:bg-accent",
                className,
            )}
        >
            {children}
            <span className="inline-flex items-center gap-1">
                {isSelected && <CheckIcon className="size-4" />}
                {endContent}
            </span>
        </div>
    );
};
