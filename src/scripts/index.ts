#!/usr/bin/env node

import "dotenv-flow/config";
import "ts-node/register";
import sync from "./sync";

const args = process.argv.slice(2);

if (args[0] === "sync") {
  sync();
}
