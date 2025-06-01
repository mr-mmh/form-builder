import { CheckboxFieldComp } from "./registry/checkbox-field";
import { InputFieldComp } from "./registry/input-field";
import { PasswordInputFieldComp } from "./registry/password-input-field";
import { RadioGroupComp } from "./registry/radio-field";
import { SelectFieldComp } from "./registry/select-field";
import { SliderFieldComp } from "./registry/slider-field";
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
function registerAll() {
    registerField({ comp: InputFieldComp, name: "Input" });
    registerField({ comp: PasswordInputFieldComp, name: "PasswordInput" });
    registerField({ comp: CheckboxFieldComp, name: "Checkbox" });
    registerField({ comp: SelectFieldComp, name: "Select" });
    registerField({ comp: SliderFieldComp, name: "Slider" });
    registerField({ comp: SwitchFieldComp, name: "Switch" });
    registerField({ comp: TextareaFieldComp, name: "Textarea" });
    const register = registerField({
        comp: RadioGroupComp,
        name: "RadioGroup",
    });
    return register;
}

registerAll();
export { fieldRegistry, registerField };
