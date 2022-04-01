import { Sequelize } from "sequelize";

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;

function getDBCredentials() {
  if (!DB_NAME) {
    throw new Error("Database name not found");
  }

  if (!DB_USER) {
    throw new Error("Database user not found");
  }

  if (!DB_PASSWORD) {
    throw new Error("Database password not found");
  }

  if (!DB_HOST) {
    throw new Error("Database host not found");
  }

  if (!DB_PORT) {
    throw new Error("Database port not found");
  }

  return {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
  };
}

export default class DB {
  private static _sequelize: Sequelize = DB.newConnection();

  private static newConnection(): Sequelize {
    const dbCredentials = getDBCredentials();
    const seq = new Sequelize(
      dbCredentials.DB_NAME,
      dbCredentials.DB_USER,
      dbCredentials.DB_PASSWORD,
      {
        dialect: "postgres",
        host: dbCredentials.DB_HOST,
        logging: false,
        port: dbCredentials.DB_PORT,
        // dialectOptions: {
        //   ssl: "Amazon RDS",
        //   connectTimeout: 60000,
        // },
        // ssl: true,
        pool: { max: 5, idle: 30, acquire: 120000 },
      }
    );

    return seq;
  }

  public static init() {
    if (!DB._sequelize) {
      DB._sequelize = DB.newConnection();
    }
  }

  public static get sequelize(): Sequelize {
    return DB._sequelize;
  }

  public static async connect() {
    try {
      await DB._sequelize.authenticate();
      console.log("Connection to database has been established successfully.");
    } catch (err) {
      console.error("Unable to connect to the database:", err);
      throw err;
    }
  }

  public static async sync() {
    try {
      const result = await DB._sequelize.sync({ alter: false });
      console.log("Database synced successfully.");
      return null;
    } catch (err) {
      console.error("Error when trying to sync database:", err);
      throw err;
    }
  }
}
