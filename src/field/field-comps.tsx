import { forwardRef, PropsWithChildren } from "react";
import { StringOrElement } from "../ui/string-or-element";
import { cn } from "@/lib/utils";
import * as ShadcnForm from "@/ui/form";

export const FieldWrapper = ({
    className,
    children,
}: PropsWithChildren<{ className?: string }>) => {
    return (
        <ShadcnForm.FormItem className={cn(className)}>
            {children}
        </ShadcnForm.FormItem>
    );
};

export const FieldControl = forwardRef(function FieldControl(
    { children, className }: PropsWithChildren<{ className?: string }>,
    ref,
) {
    return (
        <ShadcnForm.FormControl ref={ref as any} className={cn(className)}>
            {children}
        </ShadcnForm.FormControl>
    );
});

export const FieldLabel = ({
    className,
    label,
    required,
}: {
    className?: string;
    label?: React.ReactNode;
    required?: boolean;
}) => {
    if (!label) {
        return null;
    }
    return StringOrElement(label, (props) => (
        <ShadcnForm.FormLabel className={cn(className)}>
            {props.children}
            {required && <span> *</span>}
        </ShadcnForm.FormLabel>
    ));
};

export const FieldDescription = ({
    className,
    description,
}: {
    className?: string;
    description?: React.ReactNode;
}) => {
    if (!description) {
        return null;
    }
    return StringOrElement(description, (props) => (
        <ShadcnForm.FormDescription className={cn(className)}>
            {props.children}
        </ShadcnForm.FormDescription>
    ));
};

export const FieldMessage = ShadcnForm.FormMessage;
