#!/usr/bin/env node

import sync from "./sync";

require("dotenv-flow").config();
require("ts-node").register({});

const args = process.argv.slice(2);

if (args[0] === "sync") {
  sync();
}
