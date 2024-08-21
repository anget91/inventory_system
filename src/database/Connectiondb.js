import { config as configDotenv } from "dotenv";
import { Sequelize } from "sequelize";

configDotenv();

export class Connectiondb {
  static instance = null;
  constructor() {
    if (!Connectiondb.instance) {
      Connectiondb.instance = this;
      this.sequelize = new Sequelize(
        process.env.DBNAME,
        process.env.DBUSER,
        process.env.DBPASS,
        {
          host: process.env.DBHOST,
          dialect: "mysql",
          port : process.env.DBPORT
        }
      );
      this.connect();
    }
    return Connectiondb.instance;
  }
  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}
