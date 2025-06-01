import * as AC from "../autocomplete";
import { InputComponentProps } from "../types";

interface AutocompleteInputProps
    extends InputComponentProps<string[], string[]> {
    placeholder?: string;
    items: string[];
    threshold?: number;
    closeBtnText?: string;
}

function AutocompleteInput({
    items,
    defaultValue,
    disabled,
    onChange,
    placeholder,
    threshold,
    closeBtnText,
}: AutocompleteInputProps) {
    return (
        <AC.AutoCompelete
            items={items}
            onChange={onChange}
            defaultValue={defaultValue}
        >
            <AC.AutoCompeleteInputArea>
                <AC.AutoCompeleteInput
                    placeholder={placeholder}
                    threshold={threshold}
                    disabled={disabled}
                />
                <AC.AutoCompletePopover>
                    <AC.AutoCompeleteSuggestions closeBtnText={closeBtnText} />
                </AC.AutoCompletePopover>
            </AC.AutoCompeleteInputArea>
            <AC.AutoCompeleteValuesArea>
                <AC.AutoCompeleteValues />
            </AC.AutoCompeleteValuesArea>
        </AC.AutoCompelete>
    );
}

export default AutocompleteInput;
