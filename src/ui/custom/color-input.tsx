"use client";

import { forwardRef, useCallback, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Badge } from "../badge";
import { Button } from "../button";
import { InputComponentProps } from "../types";
import { useClipboard } from "../use-clipboard";
import { cn } from "@/lib/utils";

interface ColorInputProps extends InputComponentProps<string, string> {
    className?: string;
    debounceTime?: number;
    onSuccessCopy?: () => void;
    onErrCopy?: () => void;
}

const ColorInput = forwardRef<any, ColorInputProps>(function ColorInput(
    {
        className,
        defaultValue,
        disabled,
        onChange,
        debounceTime = 100,
        onErrCopy,
        onSuccessCopy,
    },
    ref,
) {
    const INPUT = useRef<HTMLInputElement | null>(null);
    const [val, setVal] = useState(defaultValue ?? "#000000");
    const copy = useClipboard();
    const handleCopy = useCallback(
        async (val: string) => {
            const r = await copy(val);
            if (r.success) {
                onSuccessCopy?.();
            } else {
                onErrCopy?.();
            }
        },
        [copy, onErrCopy, onSuccessCopy],
    );

    const _handleChange = (val: string) => {
        setVal(val);
        onChange?.(val);
    };

    const handleChange = useDebouncedCallback(_handleChange, debounceTime);

    return (
        <Button
            ref={ref}
            disabled={disabled}
            onClick={() => {
                if (INPUT.current && !disabled) {
                    INPUT.current.click();
                }
            }}
            variant={"outline"}
            className={cn(
                "flex w-full items-center justify-between",
                className,
            )}
        >
            <Badge
                onClickCapture={() => {
                    handleCopy(val);
                }}
                variant={"secondary"}
                dir="ltr"
                className="font-bold"
            >
                {val}
            </Badge>
            <div
                className={cn(
                    "relative flex size-7 items-center justify-center rounded-full border-4 border-border",
                    disabled && "opacity-50",
                )}
                style={{
                    backgroundColor: val,
                }}
            >
                <input
                    ref={INPUT}
                    id="color-input"
                    className="absolute -bottom-2 flex size-4 opacity-0"
                    type="color"
                    onInput={(event: any) => handleChange(event.target.value)}
                    value={val}
                    data-testid="setColor"
                />
            </div>
        </Button>
    );
});

export default ColorInput;
