import { ApplicationCommand, Interaction, InteractionResponse } from "../types";
import ResHelper from "./res-helper";

export type BotCommand = Omit<ApplicationCommand, "id" | "application_id"> & {
  scope: string[];
  handler: (
    req: Interaction,
    res: ResHelper
  ) => InteractionResponse | Promise<InteractionResponse>;
};

export default function (command: BotCommand) {
  return command;
}
