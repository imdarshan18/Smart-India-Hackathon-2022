import path from "path";
const prc: any = process;
module.exports = path.dirname(prc.mainModule ? prc.mainModule.filename : "");
