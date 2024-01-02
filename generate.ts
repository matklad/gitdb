#!/usr/bin/env -S deno run --allow-all
const runs: {
  timestamp: number;
  revision: string;
  measurements: { label: string; value: number; unit: string }[];
}[] = [];

const today = (new Date()).getTime() / 1000;
for (let i = 0; i < 10; i++) {
  const timestamp = Math.round(
    today +
      (24 * 60 * 60) * i +
      Math.random() * 60 * 60,
  );
  const revision = Math.random().toString(16).slice(2);
  const size = Math.round(1024 * 1024 * (1 + Math.random() / 10));
  const time = Math.round(60 * 1000 * (1 + Math.random() / 10));
  runs.push({
    timestamp,
    revision,
    measurements: [
      { label: "executable size", value: size, unit: "byte" },
      { label: "build duration", value: time, unit: "ms" },
    ],
  });
}

let text = "";
for (const run of runs) {
  text += JSON.stringify(run);
  text += "\n";
}

Deno.writeTextFileSync("./macro-benchmark/data.json", text);
