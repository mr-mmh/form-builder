export function StringOrElement(
    val: React.ReactNode,
    WrapperEl: React.FunctionComponent<{ children: React.ReactNode }>,
) {
    return <>{typeof val === "string" ? <WrapperEl>{val}</WrapperEl> : val}</>;
}
