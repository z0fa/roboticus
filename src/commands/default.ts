import defineCommand from "../helpers/define-command";

export default defineCommand({
  name: "default",
  description: "Default handler for unknow commands",
  scope: ["global"],
  handler(req, res) {
    return res.message("404");
  },
});
