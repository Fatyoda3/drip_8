import fs from "fs";
import { parseCmd } from "./src/parseCmd";
import { Byte, ADD } from "./src/types";

const MAX_BYTE_VALUE = 256;

const createByte = (integer: number): Byte => ({
  value: integer % MAX_BYTE_VALUE,
  carry: integer > MAX_BYTE_VALUE - 1 ? 1 : 0,

  add(vy) {
    return createByte(this.value + vy.value);
  },
});

const parseAddCmd = (line: string): ADD => {
  const [vx, vy] = line.split(" ");
  return { vx: Number(vx), vy: Number(vy) };
};

const execute = (line: string) => {
  const { vx, vy } = parseAddCmd(line);

  if (Number.isInteger(vx) && Number.isInteger(vy)) {
    const sum = createByte(vx).add(createByte(vy));
    return `${sum.value} ${sum.carry}`;
  }

  return parseCmd(line);
};

const main = () => {
  const lines = fs.readFileSync(0, "utf8").split("\n");

  for (const line of lines) {
    if (line.trim() === "") continue;
    const result = execute(line);
    console.log(result);
  }
};

main();
