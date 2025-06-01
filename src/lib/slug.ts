export function convertToSlug(text: string) {
    return text.toLowerCase().trim().replace(/\s+/g, "-");
}

export function writingSlug(text: string) {
    const n = text.replace(/\s+/g, "-").replace(/(-)+/g, "-");
    if (n.length === 1 && n.startsWith("-")) {
        return "";
    }
    return n;
}
