import { VALID_CMD, ValidCmd } from "./types";

export const isBetween = (low: number, cmd: number, high: number) =>
  low <= cmd && cmd <= high;

export const parseCmd = (cmdLine: string): ValidCmd => {
  const parsedValue = parseInt(cmdLine, 16);
  if (isBetween(0x00, parsedValue, 0x1ff)) return VALID_CMD.INTERPRETER;
  if (isBetween(0x200, parsedValue, 0xfff)) return VALID_CMD.PROGRAM;
  return VALID_CMD.INVALID;
};
