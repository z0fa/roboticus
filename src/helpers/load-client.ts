import "dotenv-flow/config";
import { Client as DiscordClient } from "discord.js";

const client = new DiscordClient();
const BOT_TOKEN = process.env.BOT_TOKEN;

export default async function () {
  if (client.uptime > 0) {
    return client;
  }

  await new Promise<void>((resolve, reject) => {
    client.on("ready", () => {
      resolve();
    });

    client.login(BOT_TOKEN);
  });

  return client;
}
