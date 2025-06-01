import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    endContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, endContent, dir = "ltr", ...props }, ref) => {
        const InputElement = (
            <input
                dir={dir}
                type={type}
                className={cn(
                    "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
                    className,
                )}
                ref={ref}
                {...props}
            />
        );

        if (endContent) {
            return (
                <div className="relative w-full">
                    {InputElement}
                    <div
                        className={cn(
                            "absolute top-0 flex h-full items-center justify-center",
                            dir === "rtl" ? "left-0" : "right-0",
                        )}
                    >
                        {endContent}
                    </div>
                </div>
            );
        }
        return InputElement;
    },
);
Input.displayName = "Input";

export { Input };
