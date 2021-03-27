import cmdDefault from "../commands/default";
import cmdPing from "../commands/ping";
import { BotCommand, Interaction, InteractionType } from "../types";
import ResHelper from "./res-helper";

export default function (req: Interaction, commands: BotCommand[]) {
  const res = new ResHelper();

  if (req.type === InteractionType.Ping) {
    return cmdPing.handler(req, res);
  }

  const command = commands.find((cmd) => cmd.name === req.data.name);

  if (command) {
    return command.handler(req, res);
  }

  return cmdDefault.handler(req, res);
}
