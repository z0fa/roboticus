import { InteractionResponseType } from "../types";

export default class ResHelper {
  message(content: string) {
    return {
      data: {
        content,
      },
      type: InteractionResponseType.ChannelMessage,
    };
  }

  pong() {
    return {
      type: InteractionResponseType.Pong,
    };
  }
}
