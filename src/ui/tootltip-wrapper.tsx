import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./tooltip";

export type TooltipSide = "top" | "right" | "bottom" | "left";
type Props = {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: TooltipSide;
    delay?: number;
    sideOffset?: number;
};

export const TooltipWrapper = (props: Props) => {
    if (!props.content) return props.children;
    return (
        <TooltipProvider delayDuration={props.delay ?? 0}>
            <Tooltip>
                <TooltipTrigger asChild>{props.children}</TooltipTrigger>
                <TooltipContent sideOffset={props.sideOffset} side={props.side}>
                    {props.content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
