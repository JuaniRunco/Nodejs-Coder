import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const validateLogin = (req, res, next) => {
  if (req.session.name) next();
  else res.sendFile(path.join(__dirname, "../../views/login.html"));
};
