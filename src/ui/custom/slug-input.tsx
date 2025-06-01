"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "../button";
import { Input } from "../input";
import { TooltipWrapper } from "../tootltip-wrapper";
import { convertToSlug, writingSlug } from "@/lib/slug";
import { cn } from "@/lib/utils";

type SlugInputProps = {
    disabled?: boolean;
    onChange?: (val: string) => void;
    defaultValue?: string;
    className?: string;
    canEdit?: boolean;
    changeEditSlug?: (can: boolean) => void;
    endBtn?: boolean;
    placeholder?: string;
    tooltip?: React.ReactNode;
};

function SlugInput({
    disabled,
    onChange,
    defaultValue,
    className,
    canEdit = true,
    endBtn = true,
    placeholder,
    tooltip = "activate",
    changeEditSlug,
}: SlugInputProps) {
    const [editSlug, setEditSlug] = useState(canEdit);
    const val = defaultValue ? convertToSlug(defaultValue) : undefined;

    return (
        <Input
            className={cn(className)}
            defaultValue={val}
            onChange={(e) => {
                e.target.value = writingSlug(e.target.value);
                if (onChange) {
                    onChange(e.target.value);
                }
            }}
            disabled={disabled || !editSlug}
            placeholder={placeholder}
            endContent={
                endBtn ? (
                    tooltip ? (
                        <TooltipWrapper content={tooltip}>
                            <Button
                                disabled={disabled}
                                variant={"ghost"}
                                onClick={() => {
                                    setEditSlug(!editSlug);
                                    if (changeEditSlug) {
                                        changeEditSlug(!editSlug);
                                    }
                                }}
                                type="button"
                                className={cn(
                                    "text-xs",
                                    editSlug && "bg-muted",
                                )}
                                size={"icon"}
                            >
                                <Pencil />
                            </Button>
                        </TooltipWrapper>
                    ) : (
                        <Button
                            disabled={disabled}
                            variant={"ghost"}
                            onClick={() => {
                                setEditSlug(!editSlug);
                                if (changeEditSlug) {
                                    changeEditSlug(!editSlug);
                                }
                            }}
                            type="button"
                            className={cn("text-xs", editSlug && "bg-muted")}
                            size={"icon"}
                        >
                            <Pencil />
                        </Button>
                    )
                ) : null
            }
        />
    );
}

export default SlugInput;
