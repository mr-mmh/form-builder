"use client";

import * as React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "./button";
import { Input, InputProps } from "./input";

const PasswordInput = React.forwardRef<
    HTMLInputElement,
    InputProps & { showBtn?: boolean }
>(({ showBtn = true, ...props }, ref) => {
    const [show, setShow] = React.useState<boolean>(false);

    return (
        <Input
            ref={ref}
            {...props}
            type={show ? "text" : "password"}
            endContent={
                <>
                    {showBtn ? (
                        <Button
                            className="mr-1 h-[90%] rounded-full"
                            type="button"
                            onClick={() => setShow(!show)}
                            variant="ghost"
                            size="icon"
                        >
                            {show ? (
                                <EyeClosed className="size-6" />
                            ) : (
                                <Eye className="size-6" />
                            )}
                        </Button>
                    ) : null}
                </>
            }
        />
    );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
