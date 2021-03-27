#!/usr/bin/env node

import sync from "./sync";

const args = process.argv.slice(2);

if (args[0] === "sync") {
  sync();
}
