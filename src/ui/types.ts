export interface InputComponentProps<TOnChangeVal = any, TDefaultVal = any> {
    onChange(val: TOnChangeVal): void;
    defaultValue?: TDefaultVal;
    disabled?: boolean;
}
