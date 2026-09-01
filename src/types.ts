export type ValidCmd = "INTERPRETER" | "PROGRAM" | "INVALID";

export enum VALID_CMD {
  INTERPRETER = "INTERPRETER",
  PROGRAM = "PROGRAM",
  INVALID = "INVALID",
}

export type Carry = 0 | 1;

export interface Byte {
  readonly value: number;
  readonly carry: Carry;
  readonly add: (val: Byte) => Byte;
}

export type ADD = { vx: number; vy: number };
