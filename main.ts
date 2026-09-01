import fs from "fs";

const lines = fs.readFileSync(0, "utf8").split("\n");
// TODO (what-is-chip8): implement per the lesson description.
const isInterpreterCommand = (value: number) => {
  return 0x000 >= value && value <= 0x1ff;
};

for (const line of lines) {
  if (!line) continue;
  console.log("TODO");
}
