require("dotenv").config();

import path from "path";
import express from "express";
import bodyParser from "body-parser";

import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import RestErrors from "./utils/rest_errors";
import DB from "./utils/database";
// import AuthMiddleware from "./middlewares/auth_middleware";
// importing routes
import AuthRoutes from "./routes/auth_routes";
import AdminRoutes from "./routes/admin_routes";
import PublicRoutes from "./routes/public_routes";

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors());

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static("static")); // Expose static for file downloads

/**
 * ping
 */
app.use("/ping", (req, res) => {
  res.send("pong");
});

/**
 * auth route signin and signup
 */
app.use("/auth", AuthRoutes);

/**
 * Get Videos
 */
app.use("/admin", AdminRoutes);

/**
 * Get Videos (Public Routes)
 */
app.use("/public", PublicRoutes);

/**
 * To handle 404
 */
app.use("*", (req, res) => {
  const notFoundError = RestErrors.newNotFoundError("Route not found");
  res.json(notFoundError);
});

async function setUpDatabase() {
  // DB.init();
  await DB.sync();
  await DB.connect();
}

async function main() {
  try {
    const callBack: any = (err: any) => {
      if (err) {
        console.log("Error when starting server ", err);
      } else {
        console.log("Server listening on port ", port);
      }
    };
    setUpDatabase();
    const port = process.env.PORT || "8080";
    app.listen(port, callBack);
  } catch (err) {
    console.log("Error when starting server ", err);
  }
}

// Starting server
main();
