import fs from "fs";
import { parseCmd } from "./src/parseCmd";

type Carry = 0 | 1;

interface Byte {
  readonly value: number;
  readonly carry: Carry;
  readonly add: (val: Byte) => Byte;
}

const createByte = (integer: number): Byte => ({
  value: integer % 256,
  carry: integer > 255 ? 1 : 0,

  add(vy) {
    return createByte(this.value + vy.value);
  },
});

type ADD = { vx: number; vy: number };

const parseAddCmd = (line: string): ADD => {
  const [vx, vy] = line.split(" ");
  return { vx: Number(vx), vy: Number(vy) };
};

const t = (line: string) => {
  const { vx, vy } = parseAddCmd(line);

  if (
    typeof vx !== "number" ||
    typeof vy !== "number" ||
    isNaN(vx) ||
    isNaN(vy)
  ) {
    return parseCmd(line);
  }

  const val = createByte(vx).add(createByte(vy));

  return `${val.value} ${val.carry}`;
};

const main = () => {
  const lines = fs.readFileSync(0, "utf8").split("\n");

  for (const line of lines) {
    if (line.trim() === "") continue;
    const result = t(line);
    console.log(result);
  }
};

main();
