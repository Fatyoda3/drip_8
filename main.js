const fs = require("fs");
// TODO (what-is-chip8): implement per the lesson description. --> DONE

// type ValidCmd = "INTERPRETER" | "PROGRAM" | "INVALID";

const isBetween = (low, cmd, high) => low <= cmd && cmd <= high;

const parseCmd = (cmdLine) => {
  const VALID_CMD = {
    INTERPRETER: "INTERPRETER",
    PROGRAM: "PROGRAM",
    INVALID: "INVALID",
  };

  const parsedValue = parseInt(cmdLine, 16);
  if (isBetween(0x00, parsedValue, 0x1ff)) return VALID_CMD.INTERPRETER;
  if (isBetween(0x200, parsedValue, 0xfff)) return VALID_CMD.PROGRAM;
  return VALID_CMD.INVALID;
};

const main = () => {
  const lines = fs.readFileSync(0, "utf8").split("\n");

  for (const line of lines) {
    if (line.trim() === "") continue;
    const result = parseCmd(line);
    console.log(result);
  }
};

main();
