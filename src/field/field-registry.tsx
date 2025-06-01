import { AutocompleteInputFieldComp } from "./registry/autocomplete-field";
import { CheckboxFieldComp } from "./registry/checkbox-field";
import { ColorInputFieldComp } from "./registry/color-input-field";
import { ComboboxFieldComp } from "./registry/combobox-field";
import { DynamicInputFieldComp } from "./registry/dynamic-input-field";
import { DynamicListItemsFieldComp } from "./registry/dynamic-list-items-field";
import { InputFieldComp } from "./registry/input-field";
import { ListItemsFieldComp } from "./registry/list-items-field";
import { PasswordInputFieldComp } from "./registry/password-input-field";
import { RadioGroupComp } from "./registry/radio-field";
import { SelectFieldComp } from "./registry/select-field";
import { SliderFieldComp } from "./registry/slider-field";
import { SlugInputFieldComp } from "./registry/slug-input-field";
import { SwitchFieldComp } from "./registry/switch-field";
import { TextareaFieldComp } from "./registry/textarea-field";
import { BaseFieldType, FieldComponent, FieldRegistry } from "./types";
import type { ComponentProps } from "react";

const fieldRegistry: FieldRegistry = {};

type RegisterFieldArgs<T extends BaseFieldType> = {
    comp: FieldComponent<T>;
    name: ComponentProps<FieldComponent<T>>["schema"]["kind"];
};
function registerField<T extends BaseFieldType>({
    name,
    comp,
}: RegisterFieldArgs<T>) {
    if (name in fieldRegistry) {
        throw new Error(
            `field with kind or name ${name} is already exist. please register field with another unique name`,
        );
    }
    fieldRegistry[name] = comp;
    return fieldRegistry;
}

//? register builtin Field here
function getFieldRegistry() {
    registerField({ comp: InputFieldComp, name: "Input" });
    registerField({ comp: PasswordInputFieldComp, name: "PasswordInput" });
    registerField({ comp: CheckboxFieldComp, name: "Checkbox" });
    registerField({ comp: SelectFieldComp, name: "Select" });
    registerField({ comp: SliderFieldComp, name: "Slider" });
    registerField({ comp: SwitchFieldComp, name: "Switch" });
    registerField({ comp: TextareaFieldComp, name: "Textarea" });
    registerField({ comp: ColorInputFieldComp, name: "ColorInput" });
    registerField({ comp: DynamicInputFieldComp, name: "DynamicInput" });
    registerField({ comp: ListItemsFieldComp, name: "ListItems" });
    registerField({ comp: ComboboxFieldComp, name: "Combobox" });
    registerField({
        comp: DynamicListItemsFieldComp,
        name: "DynamicListItems",
    });
    registerField({
        comp: AutocompleteInputFieldComp,
        name: "AutocompleteInput",
    });
    registerField({ comp: SlugInputFieldComp, name: "SlugInput" });
    const register = registerField({
        comp: RadioGroupComp,
        name: "RadioGroup",
    });
    return register;
}

export { getFieldRegistry, registerField };
