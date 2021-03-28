import cmdDefault from "../commands/default";
import cmdPing from "../commands/ping";
import { Interaction, InteractionType } from "../types";
import { BotCommand } from "./define-command";
import ResHelper from "./res-helper";

export default function (payload: Interaction, commands: BotCommand[]) {
  const res = new ResHelper();

  if (payload.type === InteractionType.Ping) {
    return cmdPing.handler(payload, res);
  }

  const command = commands.find((cmd) => cmd.name === payload.data.name);

  if (command) {
    return command.handler(payload, res);
  }

  return cmdDefault.handler(payload, res);
}
