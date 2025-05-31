import type { BaseFieldType, FieldComponent } from "./types";

export function createFieldComp<T extends BaseFieldType>(
    comp: FieldComponent<T>,
) {
    return comp;
}
