import defineCommand from "../helpers/define-command";

export default defineCommand({
  name: "ping",
  description: "Response to Discord PING command",
  scope: ["global"],
  handler(req, res) {
    return res.pong();
  },
});
