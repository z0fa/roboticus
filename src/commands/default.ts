import defineCommand from "../helpers/define-command";

export default defineCommand({
  name: "default",
  description: "",
  handler(req, res) {
    return res.message("404");
  },
});
