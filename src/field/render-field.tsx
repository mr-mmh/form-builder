import { BaseFieldType, FieldComponent, FieldCompProps } from "./types";
import { FormField as ShadFormField } from "@/ui/form";

type RenderFieldProps<T extends BaseFieldType> = {
    schema: FieldCompProps<T>["schema"];
    name: FieldCompProps<T>["name"];
    Comp: FieldComponent<T>;
};
export function RenderField<T extends BaseFieldType>({
    Comp,
    name,
    schema,
}: RenderFieldProps<T>) {
    if (schema.skip) {
        return null;
    }

    const { renderComponentBefore, renderComponentAfter, ...restSchema } =
        schema;
    return (
        <>
            {renderComponentBefore?.()}
            <ShadFormField
                name={name}
                disabled={schema.disabled}
                render={(formProps) => (
                    <Comp
                        schema={restSchema as any}
                        name={name}
                        {...formProps}
                    />
                )}
            />
            {renderComponentAfter?.()}
        </>
    );
}
