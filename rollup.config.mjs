import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

export default {
	input: "src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "cjs",
			exports: "named",
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: "es",
			exports: "named",
			sourcemap: true,
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve(),
		commonjs(),
		typescript({
			useTsconfigDeclarationDir: true,
			tsconfigOverride: {
				exclude: ["**/*.test.ts", "**/*.test.tsx"],
			},
		}),
	],
	external: ["react", "react-dom", "@fluentui/react"],
};
