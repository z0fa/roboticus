import defineCommand from "../helpers/define-command";

export default defineCommand({
  name: "ping",
  description: "",
  handler(req, res) {
    return res.pong();
  },
});
