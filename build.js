import esbuild from 'esbuild';
esbuild.build({
    entryPoints: ["src/server.ts"],
    outfile: "dist/server.js",
    bundle: true,
    platform: "node",
    format: "esm",
    external: ["express"],
}).catch(() => process.exit(1));