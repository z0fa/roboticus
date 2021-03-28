import fetch from "cross-fetch";
import { BotCommand } from "../helpers/define-command";
import { ApplicationCommand } from "../types";

const APP_ID = process.env.APP_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;

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
  const localCommands: BotCommand[] = await import(
    process.cwd() + "/index.ts"
  ).then((r) => r.default);

  const commandScopes = Array.from(
    localCommands.reduce((scopes, command) => {
      command.scope.forEach((scope) => {
        scopes.add(scope);
      });

      return scopes;
    }, new Set())
  ) as string[];

  for (const scope of commandScopes) {
    let listPath = scope === "global" ? "commands" : `guilds/${scope}/commands`;
    let deletePath =
      scope === "global" ? "commands/" : `guilds/${scope}/commands/`;

    const scopedCommands = localCommands.filter((command) =>
      command.scope.includes(scope)
    );

    const remoteCommands: ApplicationCommand[] = await request(
      listPath
    ).then((r) => r.json());

    const removedCommands = remoteCommands.filter(
      (localCmd) =>
        !scopedCommands.find((remoteCmd) => localCmd.name === remoteCmd.name)
    );

    for (const command of removedCommands) {
      await request(`${deletePath}/${command.id}`, null, "delete");

      console.log(`❌ [${scope}] Removed command ${command.name}`);
    }

    for (const command of scopedCommands) {
      const { handler, scope, ...payload } = command;

      await request("commands", payload, "post");

      console.log(`✅ [${scope}] Synced command ${command.name}`);
    }
  }
}
