import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "qa-*.js",
  ]),
  {
    files: ["components/slides/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: [
      "components/deck/**/*.{ts,tsx}",
      "components/nav/SlideNav.tsx",
      "components/three/**/*.{ts,tsx}",
      "components/ui/dot-pattern.tsx",
      "components/ui/meteors.tsx",
      "components/ui/particles.tsx",
      "components/ui/typing-animation.tsx",
      "components/ui/animated-list.tsx",
      "components/ui/sparkles-text.tsx",
      "components/ui/morphing-text.tsx",
      "components/ui/pulsating-button.tsx",
    ],
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "react-hooks/immutability": "off",
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
