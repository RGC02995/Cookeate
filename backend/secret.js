const crypto = require("node:crypto");
const secret = "CookEate_2024?";
const hash = crypto
.createHmac("sha256", secret)
.update("Rico rico y con fundamento")
.digest("hex");
console.log(hash);