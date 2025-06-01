import { useCallback, useState } from "react";

export function useToggle(initial: boolean = false) {
    const [open, _] = useState(initial);
    const toggle = useCallback((open?: boolean) => {
        if (open !== undefined) {
            return _(open);
        }
        _((prev) => !prev);
    }, []);

    return [open, toggle] as readonly [open: typeof open, toggle: typeof toggle];
}
