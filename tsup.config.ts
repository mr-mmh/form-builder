import { defineConfig } from "tsup";

export default defineConfig({
    entry: [
        "src/index.tsx",
        "src/ui/index.tsx"
    ],
    splitting: true,
    clean: true,
    dts: true,
    format: ["esm"],
    sourcemap: true,
    external: [
        "react",
        "react-dom",
        "clsx",
        "zod",
        "tailwindcss",
        "class-variance-authority",
        "react-hook-form",
        "tailwind-merge",
        "lucide-react",
        "@hookform/resolvers",
        "@radix-ui/react-label",
        "@radix-ui/react-slot",
        "@radix-ui/react-radio-group",
        "@radix-ui/react-select",
        "@radix-ui/react-slider",
        "@radix-ui/react-switch",
    ],
    target: "es2022",
    outExtension({ format }) {
        return {
            js: format === "cjs" ? ".cjs" : ".mjs",
        };
    },
});
