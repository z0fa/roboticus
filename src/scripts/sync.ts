import fetch from "cross-fetch";
import { ApplicationCommand, BotCommand } from "../types";

require("dotenv-flow").config();
require("ts-node").register({});

const APP_ID = process.env.APP_ID
const BOT_TOKEN = process.env.BOT_TOKEN

async function request(path: string, data: any = {}, method: string = "get") {

  let body = null;
  let headers = {
    authorization: `Bot ${BOT_TOKEN}`,
  };

  if (method === "post") {
    body = JSON.stringify(data);
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(
    `https://discord.com/api/v8/applications/${APP_ID}/${path}`,
    {
      method,
      body,
      headers,
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}

export default async function () {
  const localCommands: BotCommand[] = await import(process.cwd() + "/index.ts").then((r) => r.default)
  const globalCommands: any[] = await request("commands").then((r) => r.json());
  // const guildCommands =  await request(`guilds/${guildId}/commands`, "get")

  const removedCommands: ApplicationCommand[] = globalCommands.filter(
    (c1) => !localCommands.find((c2) => c2.name === c1.name)
  );

  for (const cmd of removedCommands) {
    await request(`commands/${cmd.id}`, null, "delete");

    console.log(`❌ Removed command ${cmd.name}`)
  }

  for (const cmd of localCommands) {
    const { handler, ...data } = cmd;

    await request("commands", data, "post");

    console.log(`✅ Upserted command ${cmd.name}`)
  }
}

